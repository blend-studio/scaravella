<?php
// backend/public/index.php

header("Access-Control-Allow-Origin: http://localhost:5173"); // Permetti React Dev Server
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require '../vendor/autoload.php';

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;

// Carica variabili d'ambiente
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Gestione Pre-flight request per CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Connessione Database (Singleton/Model)
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4";
        $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }
    return $pdo;
}

// Funzione invio mail (Service)
function sendAdminAlert($userEmail) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USER'];
        $mail->Password = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT'];

        $mail->setFrom($_ENV['SMTP_USER'], 'Scaravella Landing');
        $mail->addAddress($_ENV['ADMIN_EMAIL']);

        $mail->isHTML(true);
        $mail->Subject = 'Nuovo Download Catalogo';
        $mail->Body    = "L'utente <b>$userEmail</b> ha appena scaricato il catalogo.";

        $mail->send();
    } catch (Exception $e) {
        // Log errore ma non bloccare l'esecuzione
        error_log("Mail Error: {$mail->ErrorInfo}");
    }
}

// Router Semplice
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$input = json_decode(file_get_contents('php://input'), true);

try {
    $pdo = getDB();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        // Endpoint: Richiesta Contatto
        if ($uri === '/api/contact') {
            $stmt = $pdo->prepare("INSERT INTO leads (type, name, email, phone, message) VALUES ('contact', ?, ?, ?, ?)");
            $stmt->execute([$input['name'], $input['email'], $input['phone'], $input['message']]);
            echo json_encode(['status' => 'success', 'message' => 'Messaggio inviato']);
        } 
        
        // Endpoint: Download Catalogo
        elseif ($uri === '/api/download-catalog') {
            if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Email non valida");
            }

            // 1. Salva Lead
            $stmt = $pdo->prepare("INSERT INTO leads (type, email) VALUES ('catalog', ?)");
            $stmt->execute([$input['email']]);

            // 2. Invia Mail all'Admin
            sendAdminAlert($input['email']);

            // 3. Rispondi con il link al file
            echo json_encode([
                'status' => 'success', 
                'link' => 'http://localhost:8000/catalogo.pdf' // URL del file pubblico
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}