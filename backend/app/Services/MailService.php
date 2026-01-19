<?php
namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use Exception;

class MailService {
    
    // Modificato per accettare destinatario, oggetto e corpo HTML
    public static function send($to, $subject, $bodyHtml) {
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
            
            // Charset UTF-8 per accenti italiani
            $mail->CharSet = 'UTF-8';

            // Mittente (Sempre Scaravella)
            $mail->setFrom($_ENV['SMTP_USER'], 'Scaravella F.lli');
            
            // Destinatario Dinamico
            $mail->addAddress($to);

            // Contenuto
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $bodyHtml;
            // Versione testo semplice (fallback brutale ma utile)
            $mail->AltBody = strip_tags($bodyHtml);

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Mail Error: " . $mail->ErrorInfo);
            return false;
        }
    }
}