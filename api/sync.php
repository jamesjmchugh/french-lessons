<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/config.php';

// Extract token from Authorization header
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
$token = '';
if (preg_match('/^Bearer\s+(.+)$/i', $authHeader, $matches)) {
    $token = $matches[1];
}

if (!$token) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'No token provided']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Validate session token and get user_id
    $stmt = $pdo->prepare('SELECT user_id FROM sessions WHERE token = ?');
    $stmt->execute([$token]);
    $session = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$session) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid or expired session']);
        exit;
    }

    $userId = $session['user_id'];

    $input = json_decode(file_get_contents('php://input'), true);
    $clientProgress = $input['progress'] ?? [];

    // Fetch all server progress for this user
    $stmt = $pdo->prepare('SELECT card_id, `interval`, ease_factor, repetitions, due_date, last_review, times_shown, last_rating, updated_at FROM progress WHERE user_id = ?');
    $stmt->execute([$userId]);
    $serverRows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Index server progress by card_id
    $serverProgress = [];
    foreach ($serverRows as $row) {
        $serverProgress[$row['card_id']] = $row;
    }

    // Prepare upsert statement
    $upsert = $pdo->prepare('INSERT INTO progress (user_id, card_id, `interval`, ease_factor, repetitions, due_date, last_review, times_shown, last_rating, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            `interval` = VALUES(`interval`),
            ease_factor = VALUES(ease_factor),
            repetitions = VALUES(repetitions),
            due_date = VALUES(due_date),
            last_review = VALUES(last_review),
            times_shown = VALUES(times_shown),
            last_rating = VALUES(last_rating),
            updated_at = VALUES(updated_at)');

    // Process client progress — client wins if its lastReview is newer
    foreach ($clientProgress as $cardId => $clientCard) {
        $clientLastReview = intval($clientCard['lastReview'] ?? 0);
        $serverUpdatedAt = isset($serverProgress[$cardId]) ? intval($serverProgress[$cardId]['updated_at']) : 0;

        if ($clientLastReview > $serverUpdatedAt) {
            $upsert->execute([
                $userId,
                intval($cardId),
                floatval($clientCard['interval'] ?? 0),
                floatval($clientCard['easeFactor'] ?? 2.5),
                intval($clientCard['repetitions'] ?? 0),
                intval($clientCard['dueDate'] ?? 0),
                $clientLastReview,
                intval($clientCard['timesShown'] ?? 0),
                intval($clientCard['lastRating'] ?? 0),
                $clientLastReview
            ]);
            // Update our local index so we don't send this back as a server-win
            $serverProgress[$cardId] = [
                'card_id' => $cardId,
                'interval' => $clientCard['interval'],
                'ease_factor' => $clientCard['easeFactor'],
                'repetitions' => $clientCard['repetitions'],
                'due_date' => $clientCard['dueDate'],
                'last_review' => $clientLastReview,
                'times_shown' => $clientCard['timesShown'] ?? 0,
                'last_rating' => $clientCard['lastRating'] ?? 0,
                'updated_at' => $clientLastReview
            ];
        }
    }

    // Build response: return all server progress that the client should merge
    // (cards where server updated_at > client lastReview, or cards client doesn't have)
    $merged = [];
    foreach ($serverProgress as $cardId => $row) {
        $clientLastReview = isset($clientProgress[$cardId]) ? intval($clientProgress[$cardId]['lastReview'] ?? 0) : 0;
        $serverUpdatedAt = intval($row['updated_at']);

        if ($serverUpdatedAt > $clientLastReview) {
            $merged[$cardId] = [
                'interval' => floatval($row['interval']),
                'easeFactor' => floatval($row['ease_factor']),
                'repetitions' => intval($row['repetitions']),
                'dueDate' => intval($row['due_date']),
                'lastReview' => intval($row['last_review']),
                'timesShown' => intval($row['times_shown']),
                'lastRating' => intval($row['last_rating'])
            ];
        }
    }

    echo json_encode(['success' => true, 'progress' => $merged]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error']);
}
