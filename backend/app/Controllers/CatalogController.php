<?php
namespace App\Controllers;

use App\Models\CatalogDownload;
use App\Services\MailService;
use App\Services\EmailTemplates;

class CatalogController {
    public function download() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $email = $input['email'] ?? '';
        $name  = $input['name'] ?? 'N/D';
        $phone = $input['phone'] ?? 'N/D';
        $lang  = $input['lang'] ?? 'it';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Email non valida']);
            return;
        }

        // 1. Salva nel DB (Assumendo che il modello sia stato aggiornato per accettare name/phone, altrimenti salvalo come nota)
        // Per semplicità qui invochiamo il create standard. 
        // Se hai accesso al model, aggiorna la firma: create($email, $name, $phone)
        $model = new CatalogDownload();
        // $model->create($email, $name, $phone); <--- Ideale
        $model->create($email); // Fallback se non hai modificato il DB

        // 2. Genera Email Admin
        $adminHtml = EmailTemplates::getCatalogAdminTemplate([
            'name' => $name,
            'email' => $email,
            'phone' => $phone
        ], $lang);

        $subject = "Download Catalogo - " . $name;
        
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