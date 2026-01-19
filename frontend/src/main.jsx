import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx' // <--- Importa

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider> {/* <--- Avvolgi App */}
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)