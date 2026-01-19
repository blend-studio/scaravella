<?php
namespace App\Controllers;

use App\Models\Contact;
use App\Services\MailService;
use App\Services\EmailTemplates;

class ContactController {
    public function submit() {
        $input = json_decode(file_get_contents('php://input'), true);
        $lang = $input['lang'] ?? 'it'; // Default IT

        if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Missing fields']);
            return;
        }

        // Salva DB
        $contact = new Contact();
        $contact->create($input['name'], $input['email'], $input['phone'] ?? '', $input['message']);

        // --- EMAIL ADMIN ---
        // Avvisiamo l'admin della lingua dell'utente anche nell'oggetto
        $langTag = ($lang === 'en') ? '[EN]' : '[IT]';
        $adminHtml = EmailTemplates::getAdminContactTemplate($input, $lang);
        $adminSubject = "$langTag Nuovo Lead: " . $input['name'];
        MailService::send($_ENV['ADMIN_EMAIL'], $adminSubject, $adminHtml);

        // --- EMAIL CLIENTE ---
        // Oggetto localizzato
        $customerSubject = ($lang === 'en') 
            ? "Request Received - Scaravella F.lli" 
            : "Conferma ricezione richiesta - Scaravella F.lli";
            
        $customerHtml = EmailTemplates::getCustomerConfirmationTemplate($input, $lang);
        MailService::send($input['email'], $customerSubject, $customerHtml);

        echo json_encode(['status' => 'success']);
    }
}