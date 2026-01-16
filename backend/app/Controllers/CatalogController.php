<?php
namespace App\Controllers;

use App\Models\CatalogDownload;
use App\Services\MailService;

class CatalogController {
    public function download() {
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Email non valida']);
            return;
        }

        // 1. Salva nel DB
        $model = new CatalogDownload();
        $model->create($email);

        // 2. Invia notifica Admin
        MailService::sendAdminAlert($email);

        // 3. Restituisci link
        // Assicurati che l'URL base corrisponda al tuo server locale/remoto
        $baseUrl = "http://" . $_SERVER['HTTP_HOST']; 
        echo json_encode([
            'status' => 'success',
            'link' => $baseUrl . '/catalogo.pdf'
        ]);
    }
}