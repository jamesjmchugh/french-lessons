// SyncManager — handles auth and bidirectional progress sync
class SyncManager {
    constructor() {
        this.token = localStorage.getItem('frenchSync_token');
        this.syncInProgress = false;
        this.pendingSync = false;
        this.apiBase = this.detectApiBase();
    }

    detectApiBase() {
        // Support both root and /french/ subdirectory deployments
        const path = window.location.pathname;
        if (path.startsWith('/french/') || path === '/french') {
            return '/french/api';
        }
        return '/api';
    }

    isLoggedIn() {
        return !!this.token;
    }

    async register(email, password) {
        const res = await fetch(`${this.apiBase}/register.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!data.success) {
            throw new Error(data.error || 'Registration failed');
        }
        this.token = data.token;
        localStorage.setItem('frenchSync_token', this.token);
        // Full sync after registration
        await this.sync();
        return data;
    }

    async login(email, password) {
        const res = await fetch(`${this.apiBase}/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!data.success) {
            throw new Error(data.error || 'Login failed');
        }
        this.token = data.token;
        localStorage.setItem('frenchSync_token', this.token);
        // Full sync after login
        await this.sync();
        return data;
    }

    async sendMagicLink(email) {
        const res = await fetch(`${this.apiBase}/magic-send.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        return data;
    }

    async verifyMagicLink(token) {
        const res = await fetch(`${this.apiBase}/magic-verify.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        const data = await res.json();
        if (!data.success) {
            throw new Error(data.error || 'Invalid or expired link');
        }
        this.token = data.token;
        localStorage.setItem('frenchSync_token', this.token);
        await this.sync();
        return data;
    }

    async logout() {
        if (this.token) {
            try {
                await fetch(`${this.apiBase}/logout.php`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
            } catch (e) {
                // Logout even if the server call fails
            }
        }
        this.token = null;
        localStorage.removeItem('frenchSync_token');
    }

    async sync() {
        if (!this.isLoggedIn()) return;

        // Coalesce rapid-fire calls
        if (this.syncInProgress) {
            this.pendingSync = true;
            return;
        }

        this.syncInProgress = true;
        this.setSyncStatus('syncing');

        try {
            // Get current localStorage progress
            const progressData = localStorage.getItem('frenchFlashcards');
            const localProgress = progressData ? JSON.parse(progressData) : {};

            const res = await fetch(`${this.apiBase}/sync.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ progress: localProgress })
            });

            if (res.status === 401) {
                // Token expired or invalid — log out locally
                this.token = null;
                localStorage.removeItem('frenchSync_token');
                this.setSyncStatus('offline');
                if (window.app) window.app.updateAuthUI();
                return;
            }

            const data = await res.json();
            if (!data.success) {
                this.setSyncStatus('error');
                return;
            }

            // Merge server-wins into localStorage
            const serverProgress = data.progress || {};
            if (Object.keys(serverProgress).length > 0) {
                const merged = { ...localProgress };
                for (const [cardId, serverCard] of Object.entries(serverProgress)) {
                    const localCard = merged[cardId];
                    const localLastReview = localCard?.lastReview || 0;
                    const serverLastReview = serverCard.lastReview || 0;

                    // Server wins if its data is newer
                    if (serverLastReview > localLastReview) {
                        merged[cardId] = serverCard;
                    }
                }
                localStorage.setItem('frenchFlashcards', JSON.stringify(merged));

                // Reload cards in the app if available
                if (window.app) {
                    window.app.loadProgress();
                    window.app.initializeCards();
                    window.app.updateStats();
                    window.app.showNextCard();
                }
            }

            this.setSyncStatus('synced');
        } catch (e) {
            // Network error — we're offline, that's fine
            this.setSyncStatus('offline');
        } finally {
            this.syncInProgress = false;

            // If another sync was requested while we were busy, do it now
            if (this.pendingSync) {
                this.pendingSync = false;
                this.sync();
            }
        }
    }

    setSyncStatus(status) {
        const el = document.getElementById('sync-status');
        if (!el) return;

        switch (status) {
            case 'syncing':
                el.textContent = 'Syncing...';
                el.className = 'sync-status syncing';
                break;
            case 'synced':
                el.textContent = 'Synced';
                el.className = 'sync-status synced';
                break;
            case 'error':
                el.textContent = 'Sync error';
                el.className = 'sync-status error';
                break;
            case 'offline':
                el.textContent = 'Offline';
                el.className = 'sync-status offline';
                break;
        }
    }
}
