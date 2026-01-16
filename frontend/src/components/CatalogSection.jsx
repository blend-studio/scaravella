import React, { useState } from 'react';
import axios from 'axios';
import { Download, FileText, CheckSquare, AlertCircle } from 'lucide-react';

const CatalogSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleDownload = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post('http://localhost:8000/api/download-catalog', { email });
      if (response.data.status === 'success') {
        setStatus('success');
        window.location.href = response.data.link;
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="catalogo" className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl flex flex-col md:flex-row">
          {/* Parte Sinistra: Info */}
          <div className="md:w-1/2 p-12 bg-brand-900 text-white relative overflow-hidden">
             <div className="relative z-10">
                <FileText size={64} className="text-brand-accent mb-6" />
                <h2 className="text-3xl font-black uppercase mb-4">Schede Tecniche</h2>
                <p className="text-gray-400 mb-8">
                  Il catalogo completo Scaravella include tabelle di carico, disegni tecnici 2D/3D e guide alla lubrificazione.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3"><CheckSquare className="text-brand-accent"/> Misure Standard in Pronta Consegna</li>
                  <li className="flex items-center gap-3"><CheckSquare className="text-brand-accent"/> Specifiche ISO/DIN</li>
                  <li className="flex items-center gap-3"><CheckSquare className="text-brand-accent"/> Calcoli di durata</li>
                </ul>
             </div>
             {/* Decorazione Gialla */}
             <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-accent rounded-full opacity-10 blur-3xl"></div>
          </div>

          {/* Parte Destra: Form */}
          <div className="md:w-1/2 p-12 flex items-center">
            <div className="w-full">
              {status === 'success' ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <h4 className="font-bold text-green-800 uppercase mb-2">Download Avviato</h4>
                  <p className="text-sm text-green-700">Controlla la tua cartella download.</p>
                </div>
              ) : (
                <form onSubmit={handleDownload} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Aziendale</label>
                    <input 
                      type="email" 
                      required 
                      className="input-field"
                      placeholder="nome@azienda.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" disabled={status === 'loading'} className="w-full btn-primary flex justify-center items-center gap-2">
                    {status === 'loading' ? 'Attendere...' : <>SCARICA PDF <Download size={20}/></>}
                  </button>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm font-bold">
                      <AlertCircle size={16} /> Errore nel download. Riprova.
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;