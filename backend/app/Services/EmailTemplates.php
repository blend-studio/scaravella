<?php
namespace App\Services;

class EmailTemplates {

    private static $styleBase = "
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
        line-height: 1.6; 
        color: #333;
    ";

    private static $styleContainer = "
        max-width: 600px; 
        margin: 0 auto; 
        background-color: #ffffff; 
        border: 1px solid #e5e7eb;
    ";

    private static $styleHeader = "
        background-color: #0f172a; 
        padding: 30px; 
        text-align: center;
        border-bottom: 4px solid #eded21;
    ";

    private static $styleBody = "
        padding: 40px 30px;
    ";

    private static $styleFooter = "
        background-color: #f8fafc; 
        padding: 20px; 
        text-align: center; 
        font-size: 12px; 
        color: #64748b;
        border-top: 1px solid #e5e7eb;
    ";

    private static $logoUrl = "https://www.scaravella.it/wp-content/uploads/2020/11/Logo_Web_2020.png"; // Assicurati che sia un link pubblico

    /**
     * Template per l'Admin (Notifica nuovo lead)
     */
    public static function getAdminContactTemplate($data) {
        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px;'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>Nuovo Contatto dal Sito</h2>
                    <p style='font-size: 16px;'>È arrivata una nuova richiesta tecnica/commerciale.</p>
                    
                    <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;'>Nome:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['name']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Email:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'><a href='mailto:" . htmlspecialchars($data['email']) . "' style='color: #2563eb;'>" . htmlspecialchars($data['email']) . "</a></td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Telefono:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['phone']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;'>Messaggio:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; white-space: pre-wrap;'>" . nl2br(htmlspecialchars($data['message'])) . "</td>
                        </tr>
                    </table>

                    <div style='margin-top: 30px; text-align: center;'>
                        <a href='mailto:" . htmlspecialchars($data['email']) . "' style='background-color: #eded21; color: #0f172a; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase; display: inline-block;'>Rispondi Ora</a>
                    </div>
                </div>
                <div style='" . self::$styleFooter . "'>
                    Lead generato dal sito web Scaravella F.lli
                </div>
            </div>
        </div>";
    }

    /**
     * Template per il Cliente (Conferma ricezione)
     */
    public static function getCustomerConfirmationTemplate($data) {
        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px;'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>Richiesta Ricevuta</h2>
                    <p>Gentile <strong>" . htmlspecialchars($data['name']) . "</strong>,</p>
                    <p>Grazie per aver contattato l'Ufficio Tecnico Scaravella.</p>
                    <p>Abbiamo preso in carico la tua richiesta. Un nostro tecnico specializzato sta analizzando le tue esigenze e ti risponderà nel più breve tempo possibile.</p>
                    
                    <div style='background-color: #f8fafc; border-left: 4px solid #eded21; padding: 15px; margin: 25px 0;'>
                        <p style='margin: 0; font-weight: bold; color: #0f172a;'>TEMPO DI RISPOSTA STIMATO: 4 ORE LAVORATIVE</p>
                    </div>

                    <p>Nel frattempo, puoi consultare il nostro catalogo tecnico online.</p>

                    <p style='margin-top: 30px;'>Cordiali saluti,<br><strong>Team Scaravella F.lli</strong></p>
                </div>
                <div style='" . self::$styleFooter . "'>
                    &copy; " . date('Y') . " Scaravella F.lli S.r.l.<br>
                    Via dell'Artigianato, 12 - Piacenza (PC)<br>
                    <a href='https://www.scaravella.it' style='color: #64748b;'>www.scaravella.it</a>
                </div>
            </div>
        </div>";
    }
}