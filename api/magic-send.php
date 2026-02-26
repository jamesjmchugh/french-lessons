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

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');

// Always return success to prevent email enumeration
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => true]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Find or create user
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // Auto-create account with no password
        $stmt = $pdo->prepare('INSERT INTO users (email, password_hash) VALUES (?, NULL)');
        $stmt->execute([$email]);
        $userId = $pdo->lastInsertId();
    } else {
        $userId = $user['id'];
    }

    // Generate token (expires in 15 minutes)
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', time() + 900);
    $stmt = $pdo->prepare('INSERT INTO magic_links (user_id, token, expires_at) VALUES (?, ?, ?)');
    $stmt->execute([$userId, $token, $expiresAt]);

    // Send email
    $link = "{$app_url}/?magic={$token}";
    $subject = 'Your French Flashcards Login Link';
    $body = "Click the link below to log in to French Flashcards:\n\n{$link}\n\nThis link expires in 15 minutes.\n\nIf you didn't request this, you can safely ignore this email.";
    $headers = "From: {$mail_from}\r\nContent-Type: text/plain; charset=UTF-8";
    mail($email, $subject, $body, $headers);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    // Still return success to prevent enumeration
    echo json_encode(['success' => true]);
}
