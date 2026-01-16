import React, { useState } from 'react';
import axios from 'axios';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:8000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      // Chiudi modale dopo 2 secondi in caso di successo
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay Scuro con Blur */}
      <div 
        className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Contenuto Modale */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl border-t-4 border-brand-accent animate-in fade-in zoom-in duration-300">
        
        {/* Intestazione */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-black text-brand-900 uppercase tracking-wide">
            Parla con un Tecnico
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-brand-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h4 className="text-lg font-bold text-brand-900">Richiesta Inviata!</h4>
              <p className="text-gray-600 text-sm mt-2">Un nostro tecnico ti contatterà a breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nome e Cognome</label>
                <input 
                  type="text" required 
                  className="input-field py-2" // Versione più compatta
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                  <input 
                    type="email" required 
                    className="input-field py-2"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Telefono</label>
                  <input 
                    type="text" 
                    className="input-field py-2"
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Messaggio</label>
                <textarea 
                  rows="3" required 
                  className="input-field py-2 resize-none"
                  placeholder="Es. Richiesta preventivo per vite diametro 40..."
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={status === 'loading'} className="w-full btn-primary flex justify-center items-center gap-2 py-3">
                  {status === 'loading' ? 'Attendere...' : <>INVIA ORA <Send size={16} /></>}
                </button>
              </div>

              {status === 'error' && (
                <p className="flex items-center justify-center gap-2 text-red-600 text-xs font-bold text-center">
                  <AlertCircle size={14} /> Errore server. Riprova più tardi.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;