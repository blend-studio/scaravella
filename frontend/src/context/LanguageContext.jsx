import React, { createContext, useState, useContext } from 'react';
import { translations } from '../translations';

// Crea il Context
const LanguageContext = createContext();

// Crea il Provider
export const LanguageProvider = ({ children }) => {
  // Stato per la lingua corrente (default italiano 'it')
  const [language, setLanguage] = useState('it');

  // Funzione per cambiare lingua
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Ottieni le traduzioni in base alla lingua corrente
  // Se la lingua non esiste, fa fallback su 'it'
  const t = translations[language] || translations['it'];

  // I dati che passeremo a tutta l'app
  const value = {
    t,
    language,
    changeLanguage, // <--- QUESTA è la funzione che mancava o non veniva passata
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