<?php
namespace App\Controllers;

use App\Services\MailService;
use App\Services\EmailTemplates;
use PDO;
use Exception;

class ContactController {

    private function getDB() {
        $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4";
        return new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    public function submit() {
        header('Content-Type: application/json');

        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            $firstname = $input['firstname'] ?? '';
            $lastname  = $input['lastname'] ?? '';
            $company   = $input['company'] ?? '';
            $email     = $input['email'] ?? '';
            $phone     = $input['phone'] ?? '';
            $message   = $input['message'] ?? '';
            $lang      = $input['lang'] ?? 'it';

            if (empty($firstname) || empty($lastname) || empty($company) || empty($email) || empty($phone)) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Campi obbligatori mancanti']);
                return;
            }

            // 1. DATABASE
            $pdo = $this->getDB();
            $stmt = $pdo->prepare("INSERT INTO contacts (firstname, lastname, company, email, phone, message) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$firstname, $lastname, $company, $email, $phone, $message]);

            // 2. EMAIL ADMIN
            $adminHtml = EmailTemplates::getContactAdminTemplate([
                'firstname' => $firstname,
                'lastname' => $lastname,
                'company' => $company,
                'email' => $email,
                'phone' => $phone,
                'message' => $message
            ], $lang);
            MailService::send($_ENV['ADMIN_EMAIL'], "Richiesta Lead - $company", $adminHtml);

            // 3. EMAIL CLIENTE (Conferma)
            try {
                $clientHtml = EmailTemplates::getContactClientTemplate([
                    'firstname' => $firstname,
                    'lastname' => $lastname,
                    'company' => $company,
                    'message' => $message
                ], $lang);
                $subjectClient = ($lang === 'it') ? "Conferma ricezione richiesta" : "Request received";
                MailService::send($email, $subjectClient, $clientHtml);
            } catch (Exception $e) {
                error_log("Errore invio conferma cliente: " . $e->getMessage());
                // Non blocchiamo l'esecuzione se fallisce la mail cliente
            }

            echo json_encode(['status' => 'success']);

        } catch (Exception $e) {
            error_log("ERRORE CRITICO ContactController: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}