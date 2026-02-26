// French Flashcard App - Spaced Repetition System
// Uses a simplified SM-2 algorithm with localStorage persistence

class FlashcardApp {
    constructor() {
        this.cards = [];
        this.currentCard = null;
        this.dueCards = [];
        this.recentVerbs = []; // Track last shown verbs to avoid repetition
        this.audioPlayer = new Audio();
        this.currentlyPlayingBtn = null;
        this.settings = {
            direction: 'fr-en',
            includeVocab: true,
            includeSentences: true,
            includeVerbs: true,
            theme: 'dark',
            studyMode: 'all',
            lessonFilter: 'all'
        };

        this.init();
    }

    init() {
        this.loadSettings();
        this.applyTheme();
        this.loadProgress();
        this.initializeCards();
        this.bindEvents();
        this.updateStats();
        this.updateCardTypeCounts();
        this.showNextCard();
    }

    // Theme handling
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
    }

    toggleTheme() {
        this.settings.theme = this.settings.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        this.saveSettings();
    }

    // Audio playback
    playAudio(voice) {
        if (!this.currentCard) return;

        const cardId = this.currentCard.id;
        const audioFile = `audio/${cardId}-${voice}.mp3`;
        const btn = document.getElementById(`audio-${voice}`);

        // Stop any currently playing audio
        this.stopAudio();

        // Set up the new audio
        this.audioPlayer.src = audioFile;
        this.currentlyPlayingBtn = btn;

        // Add playing state
        btn.classList.add('playing');

        // Play the audio
        this.audioPlayer.play().catch(err => {
            console.log('Audio not available:', audioFile);
            btn.classList.remove('playing');
        });

        // Remove playing state when done
        this.audioPlayer.onended = () => {
            btn.classList.remove('playing');
            this.currentlyPlayingBtn = null;
        };

        this.audioPlayer.onerror = () => {
            btn.classList.remove('playing');
            this.currentlyPlayingBtn = null;
        };
    }

    stopAudio() {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        if (this.currentlyPlayingBtn) {
            this.currentlyPlayingBtn.classList.remove('playing');
            this.currentlyPlayingBtn = null;
        }
    }

    // Initialize cards from data.js
    initializeCards() {
        this.cards = flashcardData.map((card, index) => {
            const saved = this.getCardProgress(index);
            return {
                id: index,
                ...card,
                // Spaced repetition data
                interval: saved?.interval || 0,
                easeFactor: saved?.easeFactor || 2.5,
                repetitions: saved?.repetitions || 0,
                dueDate: saved?.dueDate || Date.now(),
                lastReview: saved?.lastReview || null
            };
        });

        this.populateLessonDropdown();
        this.updateDueCards();
    }

    // Populate lesson filter dropdown from card data
    populateLessonDropdown() {
        const select = document.getElementById('lesson-filter');
        if (!select) return;

        const lessons = [...new Set(this.cards.map(c => c.lesson).filter(Boolean))];

        // Sort: grammar topics first (no date), then dates chronologically
        const datePattern = /^(\d{1,2}) (\w+) (\d{4})$/;
        const monthOrder = { 'Nov': 11, 'Dec': 12, 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4 };

        lessons.sort((a, b) => {
            const aMatch = a.match(datePattern);
            const bMatch = b.match(datePattern);
            if (!aMatch && !bMatch) return a.localeCompare(b);
            if (!aMatch) return -1;
            if (!bMatch) return 1;
            const aDate = new Date(parseInt(aMatch[3]), (monthOrder[aMatch[2]] || 0) - 1, parseInt(aMatch[1]));
            const bDate = new Date(parseInt(bMatch[3]), (monthOrder[bMatch[2]] || 0) - 1, parseInt(bMatch[1]));
            return aDate - bDate;
        });

        // Keep "All Lessons" option, add the rest
        select.innerHTML = '<option value="all">All Lessons</option>';
        lessons.forEach(lesson => {
            const count = this.cards.filter(c => c.lesson === lesson).length;
            const option = document.createElement('option');
            option.value = lesson;
            option.textContent = `${lesson} (${count})`;
            select.appendChild(option);
        });

        select.value = this.settings.lessonFilter;
    }

    // Get cards that are due for review with priority for important verbs
    updateDueCards() {
        const now = Date.now();
        const studyMode = this.settings.studyMode;

        const filtered = this.cards.filter(card => {
            // First apply study mode filter
            if (studyMode === 'critical') {
                // Only show être, avoir, aller conjugations
                return card.priority === true;
            } else if (studyMode === 'vocabulary') {
                return card.type === 'vocabulary';
            } else if (studyMode === 'sentences') {
                return card.type === 'sentence';
            } else if (studyMode === 'verbs') {
                return card.type === 'verb' || card.type === 'conjugation';
            }

            // For 'all' mode, apply settings filters
            if (card.type === 'vocabulary' && !this.settings.includeVocab) return false;
            if (card.type === 'sentence' && !this.settings.includeSentences) return false;
            if ((card.type === 'verb' || card.type === 'conjugation') && !this.settings.includeVerbs) return false;
            return true;
        });

        // Apply lesson filter
        if (this.settings.lessonFilter !== 'all') {
            filtered = filtered.filter(card => card.lesson === this.settings.lessonFilter);
        }

        let dueCards = filtered.filter(card => card.dueDate <= now);

        // Sort with priority for important irregular verbs
        dueCards.sort((a, b) => {
            const priorityVerbs = ['être', 'avoir', 'aller'];
            const aIsPriority = a.priority || priorityVerbs.some(v =>
                a.french?.toLowerCase().includes(v) || a.verb?.toLowerCase() === v
            );
            const bIsPriority = b.priority || priorityVerbs.some(v =>
                b.french?.toLowerCase().includes(v) || b.verb?.toLowerCase() === v
            );

            // Priority cards come first
            if (aIsPriority && !bIsPriority) return -1;
            if (!aIsPriority && bIsPriority) return 1;

            // Then sort by due date
            return a.dueDate - b.dueDate;
        });

        this.dueCards = dueCards;
    }

    // SM-2 Algorithm implementation
    calculateNextReview(card, rating) {
        // Rating: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
        let { interval, easeFactor, repetitions } = card;

        // Check if this is a priority verb (shorter intervals for better retention)
        const priorityVerbs = ['être', 'avoir', 'aller'];
        const isPriority = card.priority || priorityVerbs.some(v =>
            card.french?.toLowerCase().includes(v) || card.verb?.toLowerCase() === v
        );

        if (rating === 1) {
            // Failed - reset
            repetitions = 0;
            interval = 0;
        } else {
            // Passed
            if (repetitions === 0) {
                interval = isPriority ? 0.5 : 1; // 30 seconds for priority, 1 min for others
            } else if (repetitions === 1) {
                interval = isPriority ? 5 : 10; // 5 min for priority, 10 min for others
            } else if (repetitions === 2) {
                interval = isPriority ? 720 : 1440; // 12 hours for priority, 1 day for others
            } else {
                interval = Math.round(interval * easeFactor);
            }

            repetitions++;

            // Adjust ease factor
            easeFactor = easeFactor + (0.1 - (4 - rating) * (0.08 + (4 - rating) * 0.02));
            if (easeFactor < 1.3) easeFactor = 1.3;
        }

        // Calculate due date
        const intervalMs = interval * 60 * 1000; // Convert minutes to ms
        const dueDate = Date.now() + intervalMs;

        return { interval, easeFactor, repetitions, dueDate, lastReview: Date.now() };
    }

    // Rate the current card
    rateCard(rating) {
        if (!this.currentCard) return;

        const updates = this.calculateNextReview(this.currentCard, rating);
        Object.assign(this.currentCard, updates);

        this.saveCardProgress(this.currentCard);
        this.updateDueCards();
        this.updateStats();
        this.hideAnswer();
        this.showNextCard();
    }

    // Shuffle array using Fisher-Yates algorithm
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Get the verb/word identifier for a card (for avoiding repetition)
    getCardVerb(card) {
        if (card.verb) return card.verb;
        if (card.type === 'vocabulary') return card.french;
        return card.french.substring(0, 20); // Use start of sentence as identifier
    }

    // Show the next due card with better randomization
    showNextCard() {
        // Stop any playing audio
        this.stopAudio();

        if (this.dueCards.length === 0) {
            this.showEmptyState();
            return;
        }

        // Try to find a card that doesn't repeat recent verbs
        let candidates = this.dueCards.filter(card => {
            const verb = this.getCardVerb(card);
            return !this.recentVerbs.includes(verb);
        });

        // If all cards would repeat, just use all due cards
        if (candidates.length === 0) {
            candidates = this.dueCards;
        }

        // Shuffle candidates to add variety
        const shuffled = this.shuffleArray(candidates);
        this.currentCard = shuffled[0];

        // Track this verb in recent history (keep last 5)
        const currentVerb = this.getCardVerb(this.currentCard);
        this.recentVerbs.push(currentVerb);
        if (this.recentVerbs.length > 5) {
            this.recentVerbs.shift();
        }

        this.displayCard(this.currentCard);
        this.hideEmptyState();
    }

    // Full conjugation tables for reference on card back
    getConjugationTables() {
        return {
            'être': {
                name: 'être (to be)',
                présent: [
                    { pronoun: 'je', form: 'suis', english: 'I am' },
                    { pronoun: 'tu', form: 'es', english: 'you are' },
                    { pronoun: 'il/elle', form: 'est', english: 'he/she is' },
                    { pronoun: 'nous', form: 'sommes', english: 'we are' },
                    { pronoun: 'vous', form: 'êtes', english: 'you are' },
                    { pronoun: 'ils/elles', form: 'sont', english: 'they are' }
                ],
                passéComposé: [
                    { pronoun: 'j\'', form: 'ai été', english: 'I was' },
                    { pronoun: 'tu', form: 'as été', english: 'you were' },
                    { pronoun: 'il/elle', form: 'a été', english: 'he/she was' },
                    { pronoun: 'nous', form: 'avons été', english: 'we were' },
                    { pronoun: 'vous', form: 'avez été', english: 'you were' },
                    { pronoun: 'ils/elles', form: 'ont été', english: 'they were' }
                ],
                imparfait: [
                    { pronoun: 'j\'', form: 'étais', english: 'I was' },
                    { pronoun: 'tu', form: 'étais', english: 'you were' },
                    { pronoun: 'il/elle', form: 'était', english: 'he/she was' },
                    { pronoun: 'nous', form: 'étions', english: 'we were' },
                    { pronoun: 'vous', form: 'étiez', english: 'you were' },
                    { pronoun: 'ils/elles', form: 'étaient', english: 'they were' }
                ],
                futur: [
                    { pronoun: 'je', form: 'serai', english: 'I will be' },
                    { pronoun: 'tu', form: 'seras', english: 'you will be' },
                    { pronoun: 'il/elle', form: 'sera', english: 'he/she will be' },
                    { pronoun: 'nous', form: 'serons', english: 'we will be' },
                    { pronoun: 'vous', form: 'serez', english: 'you will be' },
                    { pronoun: 'ils/elles', form: 'seront', english: 'they will be' }
                ]
            },
            'avoir': {
                name: 'avoir (to have)',
                présent: [
                    { pronoun: 'j\'', form: 'ai', english: 'I have' },
                    { pronoun: 'tu', form: 'as', english: 'you have' },
                    { pronoun: 'il/elle', form: 'a', english: 'he/she has' },
                    { pronoun: 'nous', form: 'avons', english: 'we have' },
                    { pronoun: 'vous', form: 'avez', english: 'you have' },
                    { pronoun: 'ils/elles', form: 'ont', english: 'they have' }
                ],
                passéComposé: [
                    { pronoun: 'j\'', form: 'ai eu', english: 'I had' },
                    { pronoun: 'tu', form: 'as eu', english: 'you had' },
                    { pronoun: 'il/elle', form: 'a eu', english: 'he/she had' },
                    { pronoun: 'nous', form: 'avons eu', english: 'we had' },
                    { pronoun: 'vous', form: 'avez eu', english: 'you had' },
                    { pronoun: 'ils/elles', form: 'ont eu', english: 'they had' }
                ],
                imparfait: [
                    { pronoun: 'j\'', form: 'avais', english: 'I had' },
                    { pronoun: 'tu', form: 'avais', english: 'you had' },
                    { pronoun: 'il/elle', form: 'avait', english: 'he/she had' },
                    { pronoun: 'nous', form: 'avions', english: 'we had' },
                    { pronoun: 'vous', form: 'aviez', english: 'you had' },
                    { pronoun: 'ils/elles', form: 'avaient', english: 'they had' }
                ],
                futur: [
                    { pronoun: 'j\'', form: 'aurai', english: 'I will have' },
                    { pronoun: 'tu', form: 'auras', english: 'you will have' },
                    { pronoun: 'il/elle', form: 'aura', english: 'he/she will have' },
                    { pronoun: 'nous', form: 'aurons', english: 'we will have' },
                    { pronoun: 'vous', form: 'aurez', english: 'you will have' },
                    { pronoun: 'ils/elles', form: 'auront', english: 'they will have' }
                ]
            },
            'aller': {
                name: 'aller (to go)',
                présent: [
                    { pronoun: 'je', form: 'vais', english: 'I go' },
                    { pronoun: 'tu', form: 'vas', english: 'you go' },
                    { pronoun: 'il/elle', form: 'va', english: 'he/she goes' },
                    { pronoun: 'nous', form: 'allons', english: 'we go' },
                    { pronoun: 'vous', form: 'allez', english: 'you go' },
                    { pronoun: 'ils/elles', form: 'vont', english: 'they go' }
                ],
                passéComposé: [
                    { pronoun: 'je', form: 'suis allé(e)', english: 'I went' },
                    { pronoun: 'tu', form: 'es allé(e)', english: 'you went' },
                    { pronoun: 'il/elle', form: 'est allé(e)', english: 'he/she went' },
                    { pronoun: 'nous', form: 'sommes allé(e)s', english: 'we went' },
                    { pronoun: 'vous', form: 'êtes allé(e)(s)', english: 'you went' },
                    { pronoun: 'ils/elles', form: 'sont allé(e)s', english: 'they went' }
                ],
                imparfait: [
                    { pronoun: 'j\'', form: 'allais', english: 'I was going' },
                    { pronoun: 'tu', form: 'allais', english: 'you were going' },
                    { pronoun: 'il/elle', form: 'allait', english: 'he/she was going' },
                    { pronoun: 'nous', form: 'allions', english: 'we were going' },
                    { pronoun: 'vous', form: 'alliez', english: 'you were going' },
                    { pronoun: 'ils/elles', form: 'allaient', english: 'they were going' }
                ],
                futur: [
                    { pronoun: 'j\'', form: 'irai', english: 'I will go' },
                    { pronoun: 'tu', form: 'iras', english: 'you will go' },
                    { pronoun: 'il/elle', form: 'ira', english: 'he/she will go' },
                    { pronoun: 'nous', form: 'irons', english: 'we will go' },
                    { pronoun: 'vous', form: 'irez', english: 'you will go' },
                    { pronoun: 'ils/elles', form: 'iront', english: 'they will go' }
                ]
            }
        };
    }

    // Vocabulary variations (like ce/cet/cette)
    getVocabularyVariations() {
        return {
            'ce': {
                title: 'this/that (demonstrative adjectives)',
                forms: [
                    { form: 'ce', usage: 'masc. before consonant', example: 'ce livre (this book)' },
                    { form: 'cet', usage: 'masc. before vowel/h', example: 'cet homme (this man)' },
                    { form: 'cette', usage: 'feminine', example: 'cette femme (this woman)' },
                    { form: 'ces', usage: 'plural (m/f)', example: 'ces livres (these books)' }
                ]
            },
            'cet': {
                title: 'this/that (demonstrative adjectives)',
                forms: [
                    { form: 'ce', usage: 'masc. before consonant', example: 'ce livre (this book)' },
                    { form: 'cet', usage: 'masc. before vowel/h', example: 'cet homme (this man)' },
                    { form: 'cette', usage: 'feminine', example: 'cette femme (this woman)' },
                    { form: 'ces', usage: 'plural (m/f)', example: 'ces livres (these books)' }
                ]
            },
            'cette': {
                title: 'this/that (demonstrative adjectives)',
                forms: [
                    { form: 'ce', usage: 'masc. before consonant', example: 'ce livre (this book)' },
                    { form: 'cet', usage: 'masc. before vowel/h', example: 'cet homme (this man)' },
                    { form: 'cette', usage: 'feminine', example: 'cette femme (this woman)' },
                    { form: 'ces', usage: 'plural (m/f)', example: 'ces livres (these books)' }
                ]
            },
            'le': {
                title: 'the (definite articles)',
                forms: [
                    { form: 'le', usage: 'masc. singular', example: 'le chat (the cat)' },
                    { form: 'la', usage: 'fem. singular', example: 'la maison (the house)' },
                    { form: "l'", usage: 'before vowel/h', example: "l'eau (the water)" },
                    { form: 'les', usage: 'plural (m/f)', example: 'les chats (the cats)' }
                ]
            },
            'un': {
                title: 'a/an (indefinite articles)',
                forms: [
                    { form: 'un', usage: 'masculine', example: 'un livre (a book)' },
                    { form: 'une', usage: 'feminine', example: 'une table (a table)' },
                    { form: 'des', usage: 'plural (some)', example: 'des livres (some books)' }
                ]
            },
            'mon': {
                title: 'my (possessive adjectives)',
                forms: [
                    { form: 'mon', usage: 'masc. singular', example: 'mon père (my father)' },
                    { form: 'ma', usage: 'fem. singular', example: 'ma mère (my mother)' },
                    { form: 'mes', usage: 'plural', example: 'mes amis (my friends)' }
                ]
            },
            'ton': {
                title: 'your (possessive adjectives - informal)',
                forms: [
                    { form: 'ton', usage: 'masc. singular', example: 'ton livre (your book)' },
                    { form: 'ta', usage: 'fem. singular', example: 'ta voiture (your car)' },
                    { form: 'tes', usage: 'plural', example: 'tes amis (your friends)' }
                ]
            },
            'son': {
                title: 'his/her (possessive adjectives)',
                forms: [
                    { form: 'son', usage: 'masc. singular', example: 'son père (his/her father)' },
                    { form: 'sa', usage: 'fem. singular', example: 'sa mère (his/her mother)' },
                    { form: 'ses', usage: 'plural', example: 'ses amis (his/her friends)' }
                ]
            }
        };
    }

    // Generate HTML for conjugation table
    generateConjugationHTML(verb, tense) {
        const tables = this.getConjugationTables();
        const verbData = tables[verb];
        if (!verbData) return '';

        // Map tense names
        const tenseMap = {
            'présent': 'présent',
            'passé composé': 'passéComposé',
            'imparfait': 'imparfait',
            'futur': 'futur',
            'futur proche': 'présent', // Show present for futur proche (aller + inf)
            'conditionnel': 'présent' // Fallback
        };

        const tenseKey = tenseMap[tense] || 'présent';
        const conjugations = verbData[tenseKey];
        if (!conjugations) return '';

        let html = `<div class="conjugation-table">`;
        html += `<div class="conjugation-header">${verb} - ${tense || 'présent'}</div>`;
        html += `<div class="conjugation-grid">`;

        conjugations.forEach(c => {
            html += `<div class="conjugation-row">`;
            html += `<span class="conjugation-pronoun">${c.pronoun}</span>`;
            html += `<span class="conjugation-form">${c.form}</span>`;
            html += `<span class="conjugation-english">${c.english}</span>`;
            html += `</div>`;
        });

        html += `</div></div>`;
        return html;
    }

    // Generate HTML for vocabulary variations
    generateVariationsHTML(word) {
        const variations = this.getVocabularyVariations();

        // Check if any variation matches
        const lowerWord = word.toLowerCase();
        let varData = null;

        for (const key of Object.keys(variations)) {
            if (lowerWord.includes(key)) {
                varData = variations[key];
                break;
            }
        }

        if (!varData) return '';

        let html = `<div class="variations-table">`;
        html += `<div class="variations-header">${varData.title}</div>`;
        html += `<div class="variations-grid">`;

        varData.forms.forEach(f => {
            html += `<div class="variation-row">`;
            html += `<span class="variation-form">${f.form}</span>`;
            html += `<span class="variation-usage">${f.usage}</span>`;
            html += `<span class="variation-example">${f.example}</span>`;
            html += `</div>`;
        });

        html += `</div></div>`;
        return html;
    }

    // Verb conjugation patterns for bolding
    getVerbPatterns() {
        return {
            'être': [
                'suis', 'es', 'est', 'sommes', 'êtes', 'sont',
                'étais', 'était', 'étions', 'étiez', 'étaient',
                'serai', 'seras', 'sera', 'serons', 'serez', 'seront',
                'serais', 'serait', 'serions', 'seriez', 'seraient',
                'été', 'sois', 'soit', 'soyons', 'soyez', 'soient'
            ],
            'avoir': [
                'ai', 'as', 'a', 'avons', 'avez', 'ont',
                'avais', 'avait', 'avions', 'aviez', 'avaient',
                'aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront',
                'aurais', 'aurait', 'aurions', 'auriez', 'auraient',
                'eu', 'aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'
            ],
            'aller': [
                'vais', 'vas', 'va', 'allons', 'allez', 'vont',
                'allais', 'allait', 'allions', 'alliez', 'allaient',
                'irai', 'iras', 'ira', 'irons', 'irez', 'iront',
                'irais', 'irait', 'irions', 'iriez', 'iraient',
                'allé', 'allée', 'allés', 'allées', 'aille', 'ailles'
            ]
        };
    }

    // Bold verb forms in a sentence
    boldVerbsInSentence(sentence, verb) {
        if (!verb || !sentence) return sentence;

        const patterns = this.getVerbPatterns();
        let result = sentence;

        // Get patterns for specific verb(s)
        const verbs = verb.split('/').map(v => v.trim());
        let allPatterns = [];

        verbs.forEach(v => {
            if (patterns[v]) {
                allPatterns = allPatterns.concat(patterns[v]);
            }
        });

        // Also add compound forms like "suis allé", "est allée", etc.
        const compoundPatterns = [
            'suis allé', 'suis allée', 'es allé', 'es allée',
            'est allé', 'est allée', 'sommes allés', 'sommes allées',
            'êtes allé', 'êtes allée', 'êtes allés', 'êtes allées',
            'sont allés', 'sont allées', 'est passé', 's\'est passé'
        ];
        allPatterns = allPatterns.concat(compoundPatterns);

        // Sort by length (longest first) to match compound forms before simple ones
        allPatterns.sort((a, b) => b.length - a.length);

        // Create regex and replace
        allPatterns.forEach(pattern => {
            // Word boundary regex that handles French contractions
            const regex = new RegExp(`(^|[\\s''])${this.escapeRegex(pattern)}(?=[\\s,;:.!?']|$)`, 'gi');
            result = result.replace(regex, (match, prefix) => {
                return `${prefix}<strong>${match.slice(prefix.length)}</strong>`;
            });
        });

        return result;
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Display a card
    displayCard(card) {
        const flashcard = document.getElementById('flashcard');
        const frontText = document.getElementById('front-text');
        const backText = document.getElementById('back-text');
        const cardType = document.getElementById('card-type');
        const cardHint = document.getElementById('card-hint');
        const cardExample = document.getElementById('card-example');

        // Reset card state first to prevent answer flash
        flashcard.classList.remove('flipped');

        // Determine direction
        let showFrench = true;
        if (this.settings.direction === 'en-fr') {
            showFrench = false;
        } else if (this.settings.direction === 'mixed') {
            showFrench = Math.random() > 0.5;
        }

        // Show audio buttons only on the French side
        const audioButtonsFront = document.getElementById('audio-buttons');
        const audioButtonsBack = document.getElementById('audio-buttons-back');
        audioButtonsFront.style.display = showFrench ? 'flex' : 'none';
        audioButtonsBack.style.display = showFrench ? 'none' : 'flex';

        // Check if this is a sentence with a verb to highlight
        const hasVerb = card.verb && card.type === 'sentence';

        // Build back content with conjugation/variation tables
        let backContent = '';
        let conjugationHTML = '';

        if (hasVerb) {
            // Add conjugation table for verb sentences
            conjugationHTML = this.generateConjugationHTML(card.verb, card.tense);
        } else if (card.type === 'vocabulary') {
            // Check for vocabulary variations
            conjugationHTML = this.generateVariationsHTML(card.french);
        }

        if (showFrench) {
            if (hasVerb) {
                frontText.innerHTML = this.boldVerbsInSentence(card.french, card.verb);
            } else {
                frontText.textContent = card.french;
            }
            backContent = `<div class="back-translation">${card.english}</div>`;
            if (conjugationHTML) {
                backContent += conjugationHTML;
            }
            backText.innerHTML = backContent;
        } else {
            frontText.textContent = card.english;
            if (hasVerb) {
                backContent = `<div class="back-translation">${this.boldVerbsInSentence(card.french, card.verb)}</div>`;
            } else {
                backContent = `<div class="back-translation">${card.french}</div>`;
            }
            if (conjugationHTML) {
                backContent += conjugationHTML;
            }
            backText.innerHTML = backContent;
        }

        // Set card type label - show infinitive for verb sentences, hide for clean look
        if (hasVerb) {
            cardType.textContent = card.verb;
            cardType.style.display = 'block';
        } else {
            const typeLabels = {
                vocabulary: 'Vocabulary',
                sentence: 'Sentence',
                verb: 'Verb',
                conjugation: 'Conjugation'
            };
            cardType.textContent = typeLabels[card.type] || card.type;
            cardType.style.display = 'block';
        }

        // Set hint - hide for sentences with verbs (cleaner look)
        if (hasVerb) {
            cardHint.style.display = 'none';
        } else if (card.type === 'conjugation') {
            cardHint.textContent = card.verb ? `${card.verb} - ${card.tense || ''}` : 'Conjugate';
            cardHint.style.display = 'block';
        } else if (card.type === 'verb') {
            cardHint.textContent = 'Verb infinitive';
            cardHint.style.display = 'block';
        } else if (card.type === 'sentence') {
            cardHint.textContent = 'Translate the sentence';
            cardHint.style.display = 'block';
        } else {
            cardHint.textContent = 'Tap to reveal';
            cardHint.style.display = 'block';
        }

        // Set example
        if (card.example && showFrench) {
            cardExample.textContent = card.example;
            cardExample.style.display = 'block';
        } else {
            cardExample.style.display = 'none';
        }
    }

    showAnswer() {
        document.getElementById('flashcard').classList.add('flipped');
        document.getElementById('show-controls').classList.add('hidden');
        document.getElementById('rate-controls').classList.remove('hidden');
    }

    hideAnswer() {
        document.getElementById('flashcard').classList.remove('flipped');
        document.getElementById('show-controls').classList.remove('hidden');
        document.getElementById('rate-controls').classList.add('hidden');
    }

    flipBack() {
        const flashcard = document.getElementById('flashcard');
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        } else {
            flashcard.classList.add('flipped');
        }
    }

    showEmptyState() {
        document.getElementById('flashcard').parentElement.style.display = 'none';
        document.getElementById('show-controls').classList.add('hidden');
        document.getElementById('rate-controls').classList.add('hidden');
        document.getElementById('empty-state').classList.remove('hidden');
    }

    hideEmptyState() {
        document.getElementById('flashcard').parentElement.style.display = 'block';
        document.getElementById('show-controls').classList.remove('hidden');
        document.getElementById('empty-state').classList.add('hidden');
    }

    // Study all cards (reset due dates to now)
    studyAllCards() {
        const now = Date.now();
        this.cards.forEach(card => {
            if (card.dueDate > now) {
                card.dueDate = now;
            }
        });
        this.updateDueCards();
        this.updateStats();
        this.showNextCard();
    }

    // Update statistics display
    updateStats() {
        const now = Date.now();
        const studyMode = this.settings.studyMode;

        const filtered = this.cards.filter(card => {
            // Apply study mode filter
            if (studyMode === 'critical') {
                return card.priority === true;
            } else if (studyMode === 'vocabulary') {
                return card.type === 'vocabulary';
            } else if (studyMode === 'sentences') {
                return card.type === 'sentence';
            } else if (studyMode === 'verbs') {
                return card.type === 'verb' || card.type === 'conjugation';
            }

            // For 'all' mode
            if (card.type === 'vocabulary' && !this.settings.includeVocab) return false;
            if (card.type === 'sentence' && !this.settings.includeSentences) return false;
            if ((card.type === 'verb' || card.type === 'conjugation') && !this.settings.includeVerbs) return false;
            return true;
        });

        // Apply lesson filter
        if (this.settings.lessonFilter !== 'all') {
            filtered = filtered.filter(card => card.lesson === this.settings.lessonFilter);
        }

        const dueCount = filtered.filter(c => c.dueDate <= now).length;
        const learnedCount = filtered.filter(c => c.repetitions >= 3).length;
        const totalCount = filtered.length;

        document.getElementById('due-count').textContent = dueCount;
        document.getElementById('learned-count').textContent = learnedCount;
        document.getElementById('total-count').textContent = totalCount;
    }

    // Update card type counts in settings
    updateCardTypeCounts() {
        const vocabCount = this.cards.filter(c => c.type === 'vocabulary').length;
        const sentenceCount = this.cards.filter(c => c.type === 'sentence').length;
        const verbCount = this.cards.filter(c => c.type === 'verb' || c.type === 'conjugation').length;

        const vocabEl = document.getElementById('vocab-count');
        const sentenceEl = document.getElementById('sentence-count');
        const verbEl = document.getElementById('verb-count');

        if (vocabEl) vocabEl.textContent = `${vocabCount} cards`;
        if (sentenceEl) sentenceEl.textContent = `${sentenceCount} cards`;
        if (verbEl) verbEl.textContent = `${verbCount} cards`;
    }

    // Browse view functions
    renderBrowseList(filter = 'all', search = '') {
        const cardList = document.getElementById('card-list');
        const now = Date.now();

        let filtered = this.cards;

        // Filter by type
        if (filter !== 'all') {
            if (filter === 'verb') {
                filtered = filtered.filter(c => c.type === 'verb' || c.type === 'conjugation');
            } else {
                filtered = filtered.filter(c => c.type === filter);
            }
        }

        // Filter by lesson
        if (this.settings.lessonFilter !== 'all') {
            filtered = filtered.filter(c => c.lesson === this.settings.lessonFilter);
        }

        // Filter by search
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(c =>
                c.french.toLowerCase().includes(searchLower) ||
                c.english.toLowerCase().includes(searchLower)
            );
        }

        cardList.innerHTML = filtered.map(card => {
            const isLearned = card.repetitions >= 3;
            const statusText = isLearned ? 'Learned' : (card.dueDate <= now ? 'Due' : 'Review later');
            const statusClass = isLearned ? 'learned' : '';

            return `
                <div class="card-item card-item-${card.type}">
                    <div class="card-item-content">
                        <div class="card-item-front">${card.french}</div>
                        <div class="card-item-back">${card.english}</div>
                    </div>
                    <span class="card-item-status ${statusClass}">${statusText}</span>
                </div>
            `;
        }).join('');
    }

    // Tab navigation
    showTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === `${tabName}-view`);
            view.classList.toggle('hidden', view.id !== `${tabName}-view`);
        });

        // Initialize browse view if needed
        if (tabName === 'browse') {
            this.renderBrowseList();
        }
    }

    // LocalStorage functions
    getStorageKey() {
        return 'frenchFlashcards';
    }

    loadProgress() {
        try {
            const data = localStorage.getItem(this.getStorageKey());
            this.progress = data ? JSON.parse(data) : {};
        } catch (e) {
            this.progress = {};
        }
    }

    getCardProgress(cardId) {
        return this.progress[cardId];
    }

    saveCardProgress(card) {
        this.progress[card.id] = {
            interval: card.interval,
            easeFactor: card.easeFactor,
            repetitions: card.repetitions,
            dueDate: card.dueDate,
            lastReview: card.lastReview
        };

        try {
            localStorage.setItem(this.getStorageKey(), JSON.stringify(this.progress));
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }

    loadSettings() {
        try {
            const data = localStorage.getItem('frenchFlashcardsSettings');
            if (data) {
                this.settings = { ...this.settings, ...JSON.parse(data) };
            }
        } catch (e) {
            // Use defaults
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('frenchFlashcardsSettings', JSON.stringify(this.settings));
        } catch (e) {
            console.error('Failed to save settings:', e);
        }
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.progress = {};
            this.recentVerbs = []; // Clear recent verb history
            localStorage.removeItem(this.getStorageKey());
            this.initializeCards();
            this.updateStats();
            this.showNextCard();
        }
    }

    // Event binding
    bindEvents() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Audio buttons (front)
        document.getElementById('audio-male').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip
            this.playAudio('male');
        });
        document.getElementById('audio-female').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip
            this.playAudio('female');
        });

        // Audio buttons (back)
        document.getElementById('audio-male-back').addEventListener('click', (e) => {
            e.stopPropagation();
            this.playAudio('male');
        });
        document.getElementById('audio-female-back').addEventListener('click', (e) => {
            e.stopPropagation();
            this.playAudio('female');
        });

        // Flip back button
        document.getElementById('flip-back-btn').addEventListener('click', () => {
            this.flipBack();
        });

        // Study mode selector
        const studyModeSelect = document.getElementById('study-mode');
        studyModeSelect.value = this.settings.studyMode;
        studyModeSelect.addEventListener('change', (e) => {
            this.settings.studyMode = e.target.value;
            this.saveSettings();
            this.recentVerbs = []; // Clear history when changing modes
            this.updateDueCards();
            this.updateStats();
            this.showNextCard();
        });

        // Lesson filter selector
        const lessonFilterSelect = document.getElementById('lesson-filter');
        lessonFilterSelect.value = this.settings.lessonFilter;
        lessonFilterSelect.addEventListener('change', (e) => {
            this.settings.lessonFilter = e.target.value;
            this.saveSettings();
            this.recentVerbs = [];
            this.updateDueCards();
            this.updateStats();
            this.showNextCard();
        });

        // Show answer button
        document.getElementById('show-btn').addEventListener('click', () => this.showAnswer());

        // Card click to flip
        document.getElementById('flashcard').addEventListener('click', () => {
            if (!document.getElementById('flashcard').classList.contains('flipped')) {
                this.showAnswer();
            }
        });

        // Rating buttons
        document.querySelectorAll('[data-rating]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rating = parseInt(e.currentTarget.dataset.rating);
                this.rateCard(rating);
            });
        });

        // Study all button
        document.getElementById('study-all-btn').addEventListener('click', () => this.studyAllCards());

        // Tab navigation
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.showTab(e.currentTarget.dataset.tab);
            });
        });

        // Browse search and filter
        document.getElementById('search-input').addEventListener('input', (e) => {
            const filter = document.getElementById('filter-select').value;
            this.renderBrowseList(filter, e.target.value);
        });

        document.getElementById('filter-select').addEventListener('change', (e) => {
            const search = document.getElementById('search-input').value;
            this.renderBrowseList(e.target.value, search);
        });

        // Settings
        document.querySelectorAll('input[name="direction"]').forEach(radio => {
            radio.checked = radio.value === this.settings.direction;
            radio.addEventListener('change', (e) => {
                this.settings.direction = e.target.value;
                this.saveSettings();
            });
        });

        document.getElementById('include-vocab').checked = this.settings.includeVocab;
        document.getElementById('include-vocab').addEventListener('change', (e) => {
            this.settings.includeVocab = e.target.checked;
            this.saveSettings();
            this.updateDueCards();
            this.updateStats();
            this.showNextCard();
        });

        document.getElementById('include-sentences').checked = this.settings.includeSentences;
        document.getElementById('include-sentences').addEventListener('change', (e) => {
            this.settings.includeSentences = e.target.checked;
            this.saveSettings();
            this.updateDueCards();
            this.updateStats();
            this.showNextCard();
        });

        document.getElementById('include-verbs').checked = this.settings.includeVerbs;
        document.getElementById('include-verbs').addEventListener('change', (e) => {
            this.settings.includeVerbs = e.target.checked;
            this.saveSettings();
            this.updateDueCards();
            this.updateStats();
            this.showNextCard();
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => this.resetProgress());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!document.getElementById('flashcard').classList.contains('flipped')) {
                    this.showAnswer();
                }
            } else if (e.key === '1') {
                if (document.getElementById('flashcard').classList.contains('flipped')) {
                    this.rateCard(1);
                }
            } else if (e.key === '2') {
                if (document.getElementById('flashcard').classList.contains('flipped')) {
                    this.rateCard(2);
                }
            } else if (e.key === '3') {
                if (document.getElementById('flashcard').classList.contains('flipped')) {
                    this.rateCard(3);
                }
            } else if (e.key === '4') {
                if (document.getElementById('flashcard').classList.contains('flipped')) {
                    this.rateCard(4);
                }
            } else if (e.key === 'f' || e.key === 'F') {
                if (document.getElementById('flashcard').classList.contains('flipped')) {
                    this.flipBack();
                }
            }
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FlashcardApp();
});
