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
$token = trim($input['token'] ?? '');

if (!$token) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Token is required']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Find valid, unused, non-expired token
    $stmt = $pdo->prepare('SELECT id, user_id FROM magic_links WHERE token = ? AND used = 0 AND expires_at > NOW()');
    $stmt->execute([$token]);
    $link = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$link) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid or expired link. Please request a new one.']);
        exit;
    }

    // Mark token as used
    $stmt = $pdo->prepare('UPDATE magic_links SET used = 1 WHERE id = ?');
    $stmt->execute([$link['id']]);

    // Create session token
    $sessionToken = bin2hex(random_bytes(32));
    $expiresAt = '9999-12-31 23:59:59';
    $stmt = $pdo->prepare('INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)');
    $stmt->execute([$link['user_id'], $sessionToken, $expiresAt]);

    echo json_encode(['success' => true, 'token' => $sessionToken]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error']);
}
