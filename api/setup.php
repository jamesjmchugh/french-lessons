<?php
// One-time database setup script — run once on the server to create tables
require_once __DIR__ . '/config.php';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Sessions table
    $pdo->exec("CREATE TABLE IF NOT EXISTS sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(64) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_token (token),
        INDEX idx_expires (expires_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Magic links table
    $pdo->exec("CREATE TABLE IF NOT EXISTS magic_links (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(64) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME NOT NULL,
        used TINYINT(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_magic_token (token)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // Allow passwordless users (magic link only)
    $pdo->exec("ALTER TABLE users MODIFY password_hash VARCHAR(255) DEFAULT NULL");

    // Progress table
    $pdo->exec("CREATE TABLE IF NOT EXISTS progress (
        user_id INT NOT NULL,
        card_id INT NOT NULL,
        `interval` FLOAT NOT NULL DEFAULT 0,
        ease_factor FLOAT NOT NULL DEFAULT 2.5,
        repetitions INT NOT NULL DEFAULT 0,
        due_date BIGINT NOT NULL DEFAULT 0,
        last_review BIGINT DEFAULT NULL,
        updated_at BIGINT NOT NULL DEFAULT 0,
        PRIMARY KEY (user_id, card_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    echo "Database tables created successfully.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "Setup failed: " . $e->getMessage();
}
