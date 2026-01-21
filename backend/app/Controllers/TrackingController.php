<?php
namespace App\Controllers;

use App\Models\PhoneClick;
use Exception;

class TrackingController {

    public function trackClick() {
        header('Content-Type: application/json');
        header("Access-Control-Allow-Origin: *"); 
        
        // LOG 1: Ingresso nel controller
        error_log("TrackingController: Richiesta ricevuta.");

        try {
            // Leggiamo l'input grezzo per vedere se arriva qualcosa
            $rawInput = file_get_contents('php://input');
            error_log("TrackingController: Raw Input -> " . $rawInput);

            $input = json_decode($rawInput, true);
            $section = $input['section'] ?? 'unknown';

            error_log("TrackingController: Sezione estratta -> " . $section);

            // Istanzia il Modello e salva
            $model = new PhoneClick();
            $result = $model->create($section);

            if ($result) {
                error_log("TrackingController: Salvataggio riuscito.");
            } else {
                error_log("TrackingController: Salvataggio fallito (return false dal Model).");
            }

            echo json_encode(['status' => 'tracked']);
            
        } catch (Exception $e) {
            error_log("TrackingController CRITICAL ERROR: " . $e->getMessage());
            http_response_code(500); 
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}