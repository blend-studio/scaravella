import React, { useState } from 'react';
import axios from 'axios';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:8000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* 1. OVERLAY SFONDO (Fade In/Out) */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 2. BOX MODALE (Spring Pop Up) */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white w-full max-w-lg shadow-2xl border-t-4 border-brand-accent z-10"
            onClick={(e) => e.stopPropagation()} // Evita chiusura se clicchi dentro il box
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
                  <div>
                    <input 
                      type="text" required 
                      placeholder={t.modal.name_ph} 
                      className="input-field py-3"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="email" required 
                      placeholder={t.modal.email_ph} 
                      className="input-field py-3"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder={t.modal.phone_ph} 
                      className="input-field py-3"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <textarea 
                    rows="4" required 
                    placeholder={t.modal.msg_ph} 
                    className="input-field py-3 resize-none"
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>

                  <div className="pt-2">
                    <motion.button 
                      type="submit" 
                      disabled={status === 'loading'} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary flex justify-center items-center gap-2 py-4 shadow-lg"
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