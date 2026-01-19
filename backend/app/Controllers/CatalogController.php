<?php
namespace App\Controllers;

use App\Models\CatalogDownload;
use App\Services\MailService;

class CatalogController {
    public function download() {
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $lang  = $input['lang'] ?? 'it'; // Default italiano se non specificato

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Email non valida']);
            return;
        }

        // 1. Salva nel DB
        $model = new CatalogDownload();
        $model->create($email);

        // 2. Determina il Link in base alla lingua
        if ($lang === 'en') {
            $downloadLink = 'https://www.scaravella.eu/Download/Catalogo_Scaravella_EN.html';
            $langLabel = 'Inglese (EN)';
        } else {
            $downloadLink = 'https://www.scaravella.it/Download/Catalogo_Scaravella.html';
            $langLabel = 'Italiano (IT)';
        }

        // 3. Invia notifica all'Admin (specificando la lingua)
        // Passiamo $langLabel se modifichi MailService, oppure lascia così.
        // Per semplicità qui chiamo il service standard, ma potresti voler passare la lingua anche lì.
        MailService::sendAdminAlert($email, $langLabel);

        // 4. Restituisci il link corretto
        echo json_encode([
            'status' => 'success',
            'link' => $downloadLink
        ]);
    }
}