<?php

// 1. CARICAMENTO DIPENDENZE E ENV
// Assicurati che la cartella 'vendor' sia al livello superiore rispetto a 'public' o adatta il percorso
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Carica variabili d'ambiente (.env)
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 2. GESTIONE CORS (Configurato per ballscrews.it)
$allowedOrigins = [
    'http://localhost:5173',          // Sviluppo locale
    'https://ballscrews.it',          // IL TUO DOMINIO PRODUZIONE
    'https://www.ballscrews.it'       // Anche con www
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Se l'origine è nella lista, permettila. 
// Se la richiesta non ha origine (es. Postman o server-to-server), permettiamo (fallback)
if (in_array($origin, $allowedOrigins) || empty($origin)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Opzionale: Blocca o permetti tutto (header("Access-Control-Allow-Origin: *");)
    // Per ora lasciamo vuoto per sicurezza, se hai problemi metti *
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 3. GESTIONE PREFLIGHT (Richiesta OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 4. ROUTING
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Helper per compatibilità PHP < 8.0
if (!function_exists('str_ends_with')) {
    function str_ends_with($haystack, $needle) {
        $length = strlen($needle);
        if (!$length) return true;
        return substr($haystack, -$length) === $needle;
    }
}

// LOGICA DI ROUTING
// Usiamo str_ends_with per catturare "/api/contact" anche se il server lo vede come "/public_html/api/contact"

// A. Rotta Contatti
if (str_ends_with($requestUri, '/api/contact') && $requestMethod === 'POST') {
    $controller = new \App\Controllers\ContactController();
    $controller->submit();
} 

// B. Rotta Download Catalogo
elseif (str_ends_with($requestUri, '/api/download-catalog') && $requestMethod === 'POST') {
    $controller = new \App\Controllers\CatalogController();
    $controller->download();
} 

// C. Rotta Tracking Telefono
elseif (str_ends_with($requestUri, '/api/track-phone') && $requestMethod === 'POST') {
    $controller = new \App\Controllers\TrackingController();
    $controller->trackClick();
}

// D. Rotta non trovata (404)
else {
    http_response_code(404);
    echo json_encode([
        "status" => "error", 
        "message" => "Endpoint not found",
        "debug_uri" => $requestUri, // Ti dirà cosa sta leggendo il server
        "method" => $requestMethod
    ]);
}