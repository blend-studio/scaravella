<?php
namespace App\Controllers;

use App\Services\MailService;
use App\Services\EmailTemplates;
use PDO;
use Exception;

class CatalogController {

    private function getDB() {
        $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4";
        return new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    public function download() {
        header('Content-Type: application/json');

        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            $firstname = $input['firstname'] ?? 'N/D';
            $lastname  = $input['lastname'] ?? 'N/D';
            $email     = $input['email'] ?? '';
            $phone     = $input['phone'] ?? 'N/D';
            $lang      = $input['lang'] ?? 'it';

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Email non valida']);
                return;
            }

            // 1. DATABASE
            $pdo = $this->getDB();
            $stmt = $pdo->prepare("INSERT INTO catalog_downloads (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)");
            $stmt->execute([$firstname, $lastname, $email, $phone]);

            // 2. EMAIL ADMIN
            $adminHtml = EmailTemplates::getCatalogAdminTemplate([
                'firstname' => $firstname,
                'lastname' => $lastname,
                'email' => $email,
                'phone' => $phone
            ], $lang);
            MailService::send($_ENV['ADMIN_EMAIL'], "Download Catalogo - $firstname $lastname", $adminHtml);

            // 3. LINK DOWNLOAD
            $downloadLink = ($lang === 'en') 
                ? 'https://www.scaravella.eu/Download/Catalogo_Scaravella_EN.html' 
                : 'https://www.scaravella.it/Download/Catalogo_Scaravella.html';

            // 4. EMAIL CLIENTE
            try {
                $clientHtml = EmailTemplates::getCatalogClientTemplate(['firstname' => $firstname], $downloadLink, $lang);
                $subjectClient = ($lang === 'it') ? "Il tuo Catalogo Scaravella" : "Your Scaravella Catalog";
                MailService::send($email, $subjectClient, $clientHtml);
            } catch (Exception $e) {
                error_log("Errore invio catalogo cliente: " . $e->getMessage());
            }

            echo json_encode(['status' => 'success', 'link' => $downloadLink]);

        } catch (Exception $e) {
            error_log("ERRORE CRITICO CatalogController: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}