<?php

// 1. GESTIONE CORS (Essenziale per far comunicare React e PHP)
header("Access-Control-Allow-Origin: *"); // In produzione sostituisci '*' con il tuo dominio
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 2. GESTIONE PREFLIGHT (Richiesta OPTIONS)
// Se il browser chiede "posso inviare dati?", rispondiamo SI ed usciamo.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. CARICAMENTO DIPENDENZE
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Carica variabili d'ambiente (.env)
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// 4. ROUTING
// Analizza l'URL richiesto per decidere quale Controller attivare
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

// A. Rotta Contatti
if ($requestUri === '/api/contact' && $requestMethod === 'POST') {
    $controller = new \App\Controllers\ContactController();
    $controller->submit();
} 

// B. Rotta Download Catalogo
elseif ($requestUri === '/api/download-catalog' && $requestMethod === 'POST') {
    $controller = new \App\Controllers\CatalogController();
    $controller->download();
} 

// C. Rotta non trovata (404)
else {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "Endpoint not found"]);
}