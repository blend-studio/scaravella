<?php
namespace App\Models;

use PDO;
use Exception;

class PhoneClick {
    private $pdo;

    public function __construct() {
        // Connessione al DB centralizzata nel Model
        $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4";
        $this->pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    /**
     * Salva un click nel database
     * @param string $section La sezione da cui proviene il click (es. 'navbar', 'footer')
     * @return bool
     */
    public function create($section) {
        $stmt = $this->pdo->prepare("INSERT INTO phone_clicks (section) VALUES (?)");
        return $stmt->execute([$section]);
    }
}