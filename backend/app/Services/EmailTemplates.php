<?php
namespace App\Services;

class EmailTemplates {
    
    // Stili CSS Base
    private static $styleBase = "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;";
    private static $styleContainer = "max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);";
    private static $styleHeader = "background-color: #0f172a; padding: 20px; text-align: center;";
    private static $styleBody = "padding: 30px;";
    private static $styleFooter = "background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;";
    private static $logoUrl = "https://www.scaravella.it/wp-content/uploads/2020/11/Logo_Web_2020.png";

    // --- TEMPLATE ADMIN: CONTATTO ---
    public static function getContactAdminTemplate($data, $lang = 'it') {
        $langLabel = ($lang === 'en') ? 'INGLESE (EN)' : 'ITALIANO (IT)';
        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px; filter: invert(1);'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>Nuova Richiesta Contatto</h2>
                    <div style='background-color: #facc15; color: #422006; padding: 5px 10px; display: inline-block; font-weight: bold; font-size: 12px; border-radius: 4px; margin-bottom: 20px;'>LINGUA: {$langLabel}</div>
                    <table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Nome:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['firstname']) . "</td></tr>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Cognome:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['lastname']) . "</td></tr>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Azienda:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['company']) . "</td></tr>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Email:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['email']) . "</td></tr>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Telefono:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['phone']) . "</td></tr>
                    </table>
                    <div style='background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 20px; border: 1px solid #e2e8f0;'>
                        <p style='margin: 0 0 5px 0; font-size: 12px; color: #64748b; font-weight: bold;'>MESSAGGIO:</p>
                        <p style='margin: 0; white-space: pre-wrap;'>" . htmlspecialchars($data['message']) . "</p>
                    </div>
                </div>
            </div>
        </div>";
    }

    // --- TEMPLATE CLIENTE: CONFERMA CONTATTO ---
    public static function getContactClientTemplate($data, $lang = 'it') {
        $isIt = ($lang === 'it');
        $title = $isIt ? "Abbiamo ricevuto la tua richiesta" : "We received your request";
        $greeting = $isIt ? "Gentile" : "Dear";
        $intro = $isIt ? "Grazie per aver contattato Scaravella F.lli. La tua richiesta è stata presa in carico." : "Thank you for contacting Scaravella F.lli. Your request has been received.";
        $promise = $isIt ? "Ti risponderemo entro 4 ore lavorative." : "We will reply within 4 business hours.";

        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px; filter: invert(1);'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>{$title}</h2>
                    <p>{$greeting} <strong>" . htmlspecialchars($data['firstname']) . " " . htmlspecialchars($data['lastname']) . "</strong>,</p>
                    <p>{$intro}</p>
                    <p style='background-color: #e0f2fe; padding: 15px; color: #0c4a6e; border-radius: 5px;'>{$promise}</p>
                </div>
                <div style='" . self::$styleFooter . "'>&copy; " . date('Y') . " Scaravella F.lli Srl</div>
            </div>
        </div>";
    }

    // --- TEMPLATE ADMIN: CATALOGO ---
    public static function getCatalogAdminTemplate($data, $lang = 'it') {
        $langLabel = ($lang === 'en') ? 'INGLESE (EN)' : 'ITALIANO (IT)';
        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px; filter: invert(1);'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>Download Catalogo</h2>
                    <div style='background-color: #f59e0b; color: white; padding: 5px 10px; display: inline-block; font-weight: bold; font-size: 12px; border-radius: 4px; margin-bottom: 20px;'>LINGUA: {$langLabel}</div>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Nome:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['firstname']) . "</td></tr>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Cognome:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['lastname']) . "</td></tr>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Email:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['email']) . "</td></tr>
                        <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Telefono:</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>" . htmlspecialchars($data['phone']) . "</td></tr>
                    </table>
                </div>
            </div>
        </div>";
    }

    // --- TEMPLATE CLIENTE: CATALOGO ---
    public static function getCatalogClientTemplate($data, $downloadLink, $lang = 'it') {
        $isIt = ($lang === 'it');
        $title = $isIt ? "Ecco il Catalogo Scaravella" : "Here is the Scaravella Catalog";
        $text = $isIt ? "Clicca qui sotto per scaricare il catalogo." : "Click below to download the catalog.";
        $btnText = $isIt ? "SCARICA ORA" : "DOWNLOAD NOW";

        return "
        <div style='background-color: #f1f5f9; padding: 40px 0; " . self::$styleBase . "'>
            <div style='" . self::$styleContainer . "'>
                <div style='" . self::$styleHeader . "'>
                    <img src='" . self::$logoUrl . "' alt='Scaravella' style='height: 40px; filter: invert(1);'>
                </div>
                <div style='" . self::$styleBody . "'>
                    <h2 style='color: #0f172a; margin-top: 0;'>{$title}</h2>
                    <p>Ciao <strong>" . htmlspecialchars($data['firstname']) . "</strong>,</p>
                    <p>{$text}</p>
                    <div style='text-align: center; margin: 30px 0;'>
                        <a href='{$downloadLink}' style='background-color: #facc15; color: #422006; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;'>{$btnText}</a>
                    </div>
                </div>
                <div style='" . self::$styleFooter . "'>&copy; " . date('Y') . " Scaravella F.lli Srl</div>
            </div>
        </div>";
    }
}