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

            // Recipients
            $mail->setFrom($_ENV['SMTP_USER'], 'Scaravella System');
            $mail->addAddress($_ENV['ADMIN_EMAIL']);

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'ALERT: Nuovo Download Catalogo';
            $mail->Body    = "L'utente <b>{$userEmail}</b> ha scaricato il catalogo dal sito.";

            $mail->send();
            return true;
        } catch (Exception $e) {
            // In produzione loggheresti l'errore su file
            return false;
        }
    }
}