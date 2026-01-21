<?php
namespace App\Controllers;

use App\Models\PhoneClick;
use Exception;

class TrackingController {

    public function trackClick() {
        header('Content-Type: application/json');
        header("Access-Control-Allow-Origin: *"); 
        
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Default 'unknown' se manca il parametro
            $section = $input['section'] ?? 'unknown';

            // Istanzia il Modello e salva
            $model = new PhoneClick();
            $model->create($section);

            echo json_encode(['status' => 'tracked']);
            
        } catch (Exception $e) {
            // Logghiamo l'errore ma non blocchiamo l'esecuzione lato client
            error_log("Tracking Error: " . $e->getMessage());
            http_response_code(500); 
            echo json_encode(['status' => 'error']);
        }
    }
}