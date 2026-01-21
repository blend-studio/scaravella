<?php
namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class MailService {
    public static function send($to, $subject, $body) {
        $mail = new PHPMailer(true);

        try {
            // --- CONFIGURAZIONE DEBUG ---
            // Livello 2: Mostra sia messaggi Client che Server
            $mail->SMTPDebug = SMTP::DEBUG_SERVER; 
            
            // Reindirizza l'output di debug nel log degli errori (o terminale) invece che a video
            $mail->Debugoutput = function($str, $level) {
                error_log("SMTP LOG: $str");
            };

            // --- SERVER SMTP ---
            $mail->isSMTP();
            $mail->Host       = $_ENV['SMTP_HOST'];
            $mail->SMTPAuth   = true;
            $mail->Username   = $_ENV['SMTP_USER'];
            $mail->Password   = $_ENV['SMTP_PASS'];
            
            // Selezione crittografia in base alla porta
            if ($_ENV['SMTP_PORT'] == 465) {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            } else {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            }
            
            $mail->Port       = $_ENV['SMTP_PORT'];
            $mail->Timeout    = 10; // Timeout massimo 10 secondi per evitare blocchi infiniti

            // --- MITTENTE E DESTINATARIO ---
            $mail->setFrom($_ENV['SMTP_USER'], 'Scaravella Landing');
            $mail->addAddress($to);

            // --- CONTENUTO ---
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Subject = $subject;
            $mail->Body    = $body;

            $mail->send();
            return true;

        } catch (Exception $e) {
            error_log("MailService Error: " . $mail->ErrorInfo);
            // Rilanciamo l'eccezione per gestirla nel controller
            throw new Exception("Errore invio mail: " . $mail->ErrorInfo);
        }
    }
}