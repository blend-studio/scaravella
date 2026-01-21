import axios from 'axios';

export const trackPhoneClick = (section) => {
  console.log(`[Analytics] Click rilevato su: ${section}`); // LOG 1

  axios.post('http://localhost:8000/api/track-phone', { section })
    .then(response => {
        console.log("[Analytics] Tracking inviato con successo:", response.data); // LOG 2
    })
    .catch(err => {
        console.error("[Analytics] ERRORE invio tracking:", err); // LOG ERRORE
        if (err.response) {
            // Il server ha risposto con uno status code fuori dal range 2xx
            console.error("Dati errore server:", err.response.data);
            console.error("Status errore server:", err.response.status);
        } else if (err.request) {
            // La richiesta è stata fatta ma non è arrivata risposta
            console.error("Nessuna risposta dal server (possibile problema CORS o Network)");
        }
    });
};