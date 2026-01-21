import React, { useState } from 'react';
import axios from 'axios';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ContactModal = ({ isOpen, onClose }) => {
  // 1. STATO AGGIORNATO (come in ContactSection)
  const [formData, setFormData] = useState({ 
    firstname: '', 
    lastname: '', 
    company: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  
  const [status, setStatus] = useState('idle');
  const { t, language } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Invia anche 'lang' per le email multilingua
      await axios.post('http://localhost:8000/api/contact', { ...formData, lang: language });
      setStatus('success');
      // Reset completo
      setFormData({ firstname: '', lastname: '', company: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* OVERLAY */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* MODAL BOX */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white w-full max-w-lg shadow-2xl border-t-4 border-brand-accent z-10 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-black text-brand-900 uppercase tracking-wide">
                {t.modal.title}
              </h3>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-brand-600 transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
                  <h4 className="text-xl font-bold text-brand-900 mb-2">{t.modal.success}</h4>
                  <p className="text-gray-500 text-sm">Il team Scaravella ti contatterà a breve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* NOME e COGNOME */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">{t.contact.form_firstname}</label>
                        <input 
                            type="text" name="firstname" required 
                            placeholder={t.contact.form_firstname_ph} 
                            className="input-field py-2 w-full text-sm"
                            value={formData.firstname} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">{t.contact.form_lastname}</label>
                        <input 
                            type="text" name="lastname" required 
                            placeholder={t.contact.form_lastname_ph} 
                            className="input-field py-2 w-full text-sm"
                            value={formData.lastname} onChange={handleChange}
                        />
                    </div>
                  </div>

                  {/* AZIENDA */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">{t.contact.form_company}</label>
                    <input 
                        type="text" name="company" required 
                        placeholder={t.contact.form_company_ph} 
                        className="input-field py-2 w-full text-sm"
                        value={formData.company} onChange={handleChange}
                    />
                  </div>
                  
                  {/* EMAIL e TELEFONO */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">{t.contact.form_email}</label>
                        <input 
                            type="email" name="email" required 
                            placeholder={t.contact.form_email_ph} 
                            className="input-field py-2 w-full text-sm"
                            value={formData.email} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">{t.contact.form_phone}</label>
                        <input 
                            type="text" name="phone" required 
                            placeholder={t.contact.form_phone_ph} 
                            className="input-field py-2 w-full text-sm"
                            value={formData.phone} onChange={handleChange}
                        />
                    </div>
                  </div>

                  {/* MESSAGGIO */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">{t.contact.form_msg}</label>
                    <textarea 
                        name="message" rows="3" 
                        placeholder={t.contact.form_msg_ph} 
                        className="input-field py-2 w-full text-sm resize-none"
                        value={formData.message} onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <motion.button 
                      type="submit" 
                      disabled={status === 'loading'} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary flex justify-center items-center gap-2 py-4 shadow-lg text-sm font-bold tracking-widest"
                    >
                      {status === 'loading' ? t.modal.loading : <>{t.modal.btn} <Send size={18} /></>}
                    </motion.button>
                  </div>

                  {status === 'error' && (
                    <motion.p 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-red-600 text-xs font-bold text-center mt-2"
                    >
                      <AlertCircle size={14} /> Errore server. Riprova più tardi.
                    </motion.p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;