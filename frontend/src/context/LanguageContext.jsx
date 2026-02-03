import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

// Crea il Context
const LanguageContext = createContext();

// Crea il Provider
export const LanguageProvider = ({ children }) => {
  // Estrai la lingua dall'URL (path) o usa 'it' come default
  const getLanguageFromURL = () => {
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/it')) return 'it';
    return 'it'; // default
  };

  // Stato per la lingua corrente
  const [language, setLanguage] = useState(getLanguageFromURL());

  // Effetto: quando la pagina si carica, verifica l'URL
  useEffect(() => {
    const urlLang = getLanguageFromURL();
    if (urlLang !== language) {
      setLanguage(urlLang);
    }
  }, []);

  // Funzione per cambiare lingua e aggiornare URL
  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Aggiorna l'URL con il nuovo linguaggio
    // Se è italiano, va alla root '/'. Se è inglese, va a '/en'
    const newPath = lang === 'it' ? '/' : '/en';
    window.history.pushState({}, '', newPath);
  };

  // Ottieni le traduzioni in base alla lingua corrente
  // Se la lingua non esiste, fa fallback su 'it'
  const t = translations[language] || translations['it'];

  // I dati che passeremo a tutta l'app
  const value = {
    t,
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizzato per usare il contesto facilmente
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};