<?php
namespace App\Controllers;

use App\Models\CatalogDownload; // Assicurati di usare il modello corretto se esiste
use App\Services\MailService;
use App\Services\EmailTemplates;

class CatalogController {
    public function download() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $email     = $input['email'] ?? '';
        $firstname = $input['firstname'] ?? 'N/D';
        $lastname  = $input['lastname'] ?? 'N/D';
        $phone     = $input['phone'] ?? 'N/D';
        $lang      = $input['lang'] ?? 'it';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Email non valida']);
            return;
        }

        // 1. Salva nel DB (Concateniamo se necessario per compatibilità)
        $fullName = $firstname . ' ' . $lastname;
        // $model = new CatalogDownload();
        // $model->create($email, $fullName, $phone); // Esempio

        // 2. Genera Email Admin
        $adminHtml = EmailTemplates::getCatalogAdminTemplate([
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'phone' => $phone
        ], $lang);

        $subject = "Download Catalogo - " . $firstname . " " . $lastname;
        
        // 3. Invia Mail
        MailService::send($_ENV['ADMIN_EMAIL'], $subject, $adminHtml);

        // 4. Link Download
        if ($lang === 'en') {
            $downloadLink = 'https://www.scaravella.eu/Download/Catalogo_Scaravella_EN.html';
        } else {
            $downloadLink = 'https://www.scaravella.it/Download/Catalogo_Scaravella.html';
        }

        echo json_encode([
            'status' => 'success',
            'link' => $downloadLink
        ]);
    }
}