<?php
namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use Exception;

class MailService {
    public static function sendAdminAlert($userEmail) {
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = $_ENV['SMTP_HOST'];
            $mail->SMTPAuth   = true;
            $mail->Username   = $_ENV['SMTP_USER'];
            $mail->Password   = $_ENV['SMTP_PASS'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $_ENV['SMTP_PORT'];

            // Mittente e Destinatario
            $mail->setFrom($_ENV['SMTP_USER'], 'Scaravella Landing');
            
            // Qui usiamo la variabile d'ambiente, ma di base sarà info@scaravella.it
            $mail->addAddress($_ENV['ADMIN_EMAIL']); 

            // Contenuto Mail
            $mail->isHTML(true);
            $mail->Subject = 'Nuovo Accesso Catalogo HTML';
            $mail->Body    = "L'utente <b>{$userEmail}</b> ha effettuato l'accesso al catalogo interattivo (HTML).";

            $mail->send();
            return true;
        } catch (Exception $e) {
            // Log errore (opzionale)
            return false;
        }
    }
}