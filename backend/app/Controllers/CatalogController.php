<?php
namespace App\Controllers;

use App\Models\Contact;
use App\Services\MailService;
use App\Services\EmailTemplates; // Importa i template

class ContactController {
    public function submit() {
        $input = json_decode(file_get_contents('php://input'), true);

        // Validazione base
        if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Campi obbligatori mancanti']);
            return;
        }

        // 1. Salva nel DB
        $contact = new Contact();
        $contact->create($input['name'], $input['email'], $input['phone'] ?? '', $input['message']);

        // --- INVIO EMAIL ---
        
        // A. Email all'ADMIN (Staff Scaravella)
        $adminHtml = EmailTemplates::getAdminContactTemplate($input);
        $adminSubject = "Nuovo Lead dal Sito: " . $input['name'];
        // Invia all'indirizzo admin definito nel .env
        MailService::send($_ENV['ADMIN_EMAIL'], $adminSubject, $adminHtml);

        // B. Email al CLIENTE (Conferma)
        $customerHtml = EmailTemplates::getCustomerConfirmationTemplate($input);
        $customerSubject = "Conferma ricezione richiesta - Scaravella F.lli";
        // Invia all'indirizzo inserito nel form
        MailService::send($input['email'], $customerSubject, $customerHtml);

        // --- FINE INVIO ---

        echo json_encode(['status' => 'success', 'message' => 'Richiesta inviata']);
    }
}