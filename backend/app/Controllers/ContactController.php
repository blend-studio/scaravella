<?php
namespace App\Controllers;

use App\Models\Contact;

class ContactController {
    public function store() {
        // Leggi JSON input da React
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['email']) || empty($input['message'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Dati mancanti']);
            return;
        }

        $contact = new Contact();
        $success = $contact->create(
            $input['name'] ?? '',
            $input['email'],
            $input['phone'] ?? '',
            $input['message']
        );

        if ($success) {
            echo json_encode(['status' => 'success', 'message' => 'Messaggio inviato']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Errore server']);
        }
    }
}