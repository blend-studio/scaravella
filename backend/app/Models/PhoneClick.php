<?php
namespace App\Models;

use PDO;
use Exception;

class PhoneClick {
    private $pdo;

    public function __construct() {
        try {
            $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4";
            $this->pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            // LOG 1: Connessione OK
            // (Scommenta solo se hai dubbi sulla connessione, altrimenti riempie i log)
            // error_log("PhoneClick Model: Connessione DB OK");
        } catch (Exception $e) {
            error_log("PhoneClick Model: ERRORE CONNESSIONE DB -> " . $e->getMessage());
            throw $e;
        }
    }

    public function create($section) {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO phone_clicks (section) VALUES (?)");
            $success = $stmt->execute([$section]);
            
            if ($success) {
                error_log("PhoneClick Model: Query eseguita con successo per sezione '$section'");
            } else {
                error_log("PhoneClick Model: Query fallita (execute ha ritornato false)");
            }
            return $success;

        } catch (Exception $e) {
            error_log("PhoneClick Model: ERRORE QUERY SQL -> " . $e->getMessage());
            throw $e;
        }
    }
}