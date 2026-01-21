<?php
namespace App\Services;

class EmailTemplates {

    private static $styleBase = "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333;";
    private static $styleContainer = "max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb;";
    private static $styleHeader = "background-color: #0f172a; padding: 30px; text-align: center; border-bottom: 4px solid #eded21;";
    private static $styleBody = "padding: 40px 30px;";
    private static $styleFooter = "background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e5e7eb;";
    private static $logoUrl = "https://www.scaravella.it/wp-content/uploads/2020/11/Logo_Web_2020.png";

    /**
     * Template Admin (Notifica interna)
     */
/**
     * Template Admin per Richiesta Contatto
     */
    public static function getContactAdminTemplate($data, $lang = 'it') {
        $langLabel = ($lang === 'en') ? 'INGLESE (EN)' : 'ITALIANO (IT)';
        
        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px;'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>Nuova Richiesta Contatto</h2>
                    
                    <div style='background-color: #facc15; color: #422006; padding: 5px 10px; display: inline-block; font-weight: bold; font-size: 12px; border-radius: 4px; margin-bottom: 20px;'>
                        LINGUA: {$langLabel}
                    </div>

                    <table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;'>Nome:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['firstname']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Cognome:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['lastname']) . "</td>
                        </tr>
                        <tr style='background-color: #f8fafc;'>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Azienda:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #0f172a;'>" . htmlspecialchars($data['company']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Email Aziendale:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'><a href='mailto:" . htmlspecialchars($data['email']) . "'>" . htmlspecialchars($data['email']) . "</a></td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Telefono:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['phone']) . "</td>
                        </tr>
                    </table>

                    <div style='background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 20px; border: 1px solid #e2e8f0;'>
                        <p style='margin: 0 0 5px 0; font-size: 12px; color: #64748b; font-weight: bold; text-transform: uppercase;'>Messaggio:</p>
                        <p style='margin: 0; white-space: pre-wrap; color: #334155;'>" . (empty($data['message']) ? 'Nessun messaggio inserito.' : htmlspecialchars($data['message'])) . "</p>
                    </div>

                </div>
                <div style='" . self::$styleFooter . "'>Lead generato da scaravella.it</div>
            </div>
        </div>";
    }
    /**
     * Template Cliente (Multilingua)
     */
    public static function getCustomerConfirmationTemplate($data, $lang = 'it') {
        // Testi localizzati
        if ($lang === 'en') {
            $title = "Request Received";
            $greeting = "Dear";
            $intro = "Thank you for contacting Scaravella F.lli Technical Office.";
            $body = "We have received your request. One of our specialized engineers is analyzing your needs and will reply as soon as possible.";
            $boxText = "ESTIMATED RESPONSE TIME: 4 WORKING HOURS";
            $catalogText = "In the meantime, you can browse our online technical catalog.";
            $closing = "Best regards,";
        } else {
            $title = "Richiesta Ricevuta";
            $greeting = "Gentile";
            $intro = "Grazie per aver contattato l'Ufficio Tecnico Scaravella.";
            $body = "Abbiamo preso in carico la tua richiesta. Un nostro tecnico specializzato sta analizzando le tue esigenze e ti risponderà nel più breve tempo possibile.";
            $boxText = "TEMPO DI RISPOSTA STIMATO: 4 ORE LAVORATIVE";
            $catalogText = "Nel frattempo, puoi consultare il nostro catalogo tecnico online.";
            $closing = "Cordiali saluti,";
        }

        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px;'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>{$title}</h2>
                    <p>{$greeting} <strong>" . htmlspecialchars($data['name']) . "</strong>,</p>
                    <p>{$intro}</p>
                    <p>{$body}</p>
                    
                    <div style='background-color: #f8fafc; border-left: 4px solid #eded21; padding: 15px; margin: 25px 0;'>
                        <p style='margin: 0; font-weight: bold; color: #0f172a;'>{$boxText}</p>
                    </div>

                    <p>{$catalogText}</p>

                    <p style='margin-top: 30px;'>{$closing}<br><strong>Team Scaravella F.lli</strong></p>
                </div>
                <div style='" . self::$styleFooter . "'>
                    &copy; " . date('Y') . " Scaravella F.lli S.r.l.<br>
                    Via dell'Artigianato, 12 - Piacenza (PC) - Italy<br>
                    <a href='https://www.scaravella.it' style='color: #64748b;'>www.scaravella.it</a>
                </div>
            </div>
        </div>";
    }


    /**
     * Template Admin per Download Catalogo
     */
/**
     * Template Admin per Download Catalogo
     */
    public static function getCatalogAdminTemplate($data, $lang = 'it') {
        $langLabel = ($lang === 'en') ? 'INGLESE (EN)' : 'ITALIANO (IT)';
        
        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px;'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>Download Catalogo</h2>
                    
                    <div style='background-color: #f59e0b; color: white; padding: 5px 10px; display: inline-block; font-weight: bold; font-size: 12px; border-radius: 4px; margin-bottom: 20px;'>
                        LINGUA: {$langLabel}
                    </div>

                    <p>Un nuovo utente ha effettuato l'accesso al catalogo digitale.</p>

                    <table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;'>Nome:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['firstname']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Cognome:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['lastname']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Telefono:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['phone']) . "</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Email:</td>
                            <td style='padding: 10px; border-bottom: 1px solid #eee;'><a href='mailto:" . htmlspecialchars($data['email']) . "' style='color: #2563eb;'>" . htmlspecialchars($data['email']) . "</a></td>
                        </tr>
                    </table>
                </div>
                <div style='" . self::$styleFooter . "'>Lead generato da scaravella.it</div>
            </div>
        </div>";
    }
    
}