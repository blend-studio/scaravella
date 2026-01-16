<?php
namespace App\Models;

use App\Config\Database;

class Contact {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    public function create($name, $email, $phone, $message) {
        $stmt = $this->pdo->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$name, $email, $phone, $message]);
    }
}