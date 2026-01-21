<?php
namespace App\Controllers;

use App\Services\MailService;
use App\Services\EmailTemplates;
use App\Models\Lead; // Assicurati di avere questo use se usi il modello

class ContactController {
    public function submit() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Recupero nuovi campi
        $firstname = $input['firstname'] ?? '';
        $lastname  = $input['lastname'] ?? '';
        $company   = $input['company'] ?? '';
        $email     = $input['email'] ?? '';
        $phone     = $input['phone'] ?? '';
        $message   = $input['message'] ?? ''; // Opzionale
        $lang      = $input['lang'] ?? 'it';

        // Validazione Backend (Azienda, Nome, Cognome, Email, Telefono obbligatori)
        if (empty($firstname) || empty($lastname) || empty($company) || empty($email) || empty($phone)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Campi obbligatori mancanti']);
            return;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Email non valida']);
            return;
        }

        // Salva nel DB (Concateniamo Nome+Cognome per compatibilità se il DB ha solo 'name')
        // Oppure modifica il tuo DB per avere le colonne separate.
        $fullName = $firstname . ' ' . $lastname;
        
        // Esempio salvataggio (adatta al tuo Model)
        // $lead = new Lead();
        // $lead->save($fullName, $email, $phone, $message, $company); 

        // Genera Email Admin con il nuovo Template
        $adminHtml = EmailTemplates::getContactAdminTemplate([
            'firstname' => $firstname,
            'lastname' => $lastname,
            'company' => $company,
            'email' => $email,
            'phone' => $phone,
            'message' => $message
        ], $lang);

        $subject = "Richiesta da Landing Page - " . $company;
        
        // Invia Mail
        MailService::send($_ENV['ADMIN_EMAIL'], $subject, $adminHtml);

        echo json_encode(['status' => 'success']);
    }
}