<?php
namespace App\Models;

use App\Config\Database;

class CatalogDownload {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    public function create($email) {
        $stmt = $this->pdo->prepare("INSERT INTO catalog_downloads (email) VALUES (?)");
        return $stmt->execute([$email]);
    }
}