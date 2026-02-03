import React, { useState } from 'react';
import axios from 'axios';
import { Phone, Mail, Send, CheckCircle } from 'lucide-react'; // MapPin e AlertCircle rimossi se non usati
import { Reveal } from './Reveal';
import { useTranslation } from '../context/LanguageContext';
import { trackPhoneClick } from '../utils/analytics';

const ContactSection = () => {
  // 1. Aggiornato lo stato iniziale con i nuovi campi
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
      await axios.post('https://ballscrews.it/api/contact', { ...formData, lang: language });
      setStatus('success');
      // Reset form completo
      setFormData({ firstname: '', lastname: '', company: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) { 
      setStatus('error'); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contatti" className="py-12 md:py-24 bg-white text-brand-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h4 className="text-brand-600 font-bold uppercase tracking-widest mb-2 text-sm">{t.contact.label}</h4>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-900">{t.contact.title}</h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Info Side (Invariato) */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">{t.contact.box_title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t.contact.box_desc}</p>
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200">
                   {t.contact.box_badge}
                </div>
            </div>

            <div className="space-y-6 text-lg">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-accent text-brand-900 flex items-center justify-center rounded-sm shadow-sm">
                        <Phone size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">{t.contact.phone_label}</p>
                        <a href="tel:+390523480192" onClick={() => trackPhoneClick('contact_section')} className="font-bold text-xl hover:text-brand-600 transition-colors">0523 480192</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-accent text-brand-900 flex items-center justify-center rounded-sm shadow-sm">
                        <Mail size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">{t.contact.email_label}</p>
                        <p className="font-bold text-xl hover:text-brand-600 transition-colors">info@scaravella.it</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white text-brand-900 p-8 md:p-10 shadow-2xl border border-gray-100">
             {status === 'success' ? (
                <div className="text-center py-12">
                    <CheckCircle size={64} className="mx-auto text-green-500 mb-4"/>
                    <h3 className="text-2xl font-bold">{t.contact.success_title}</h3>
                    <p className="text-gray-500 mt-2">{t.contact.success_desc}</p>
                    <button onClick={() => setStatus('idle')} className="mt-8 text-sm font-bold underline text-brand-900">{t.contact.new_req}</button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-2xl font-black uppercase mb-6">{t.contact.form_title}</h3>
                    
                    {/* RIGA 1: NOME e COGNOME */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.contact.form_firstname}</label>
                            <input 
                                type="text" name="firstname" required 
                                className="input-field w-full bg-gray-50 border-gray-200 focus:bg-white p-3" 
                                placeholder={t.contact.form_firstname_ph} 
                                value={formData.firstname} onChange={handleChange} 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.contact.form_lastname}</label>
                            <input 
                                type="text" name="lastname" required 
                                className="input-field w-full bg-gray-50 border-gray-200 focus:bg-white p-3" 
                                placeholder={t.contact.form_lastname_ph} 
                                value={formData.lastname} onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* RIGA 2: AZIENDA (Nuovo Campo) */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.contact.form_company}</label>
                        <input 
                            type="text" name="company" required 
                            className="input-field w-full bg-gray-50 border-gray-200 focus:bg-white p-3" 
                            placeholder={t.contact.form_company_ph} 
                            value={formData.company} onChange={handleChange} 
                        />
                    </div>

                    {/* RIGA 3: EMAIL e TELEFONO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.contact.form_email}</label>
                            <input 
                                type="email" name="email" required 
                                className="input-field w-full bg-gray-50 border-gray-200 focus:bg-white p-3" 
                                placeholder={t.contact.form_email_ph} 
                                value={formData.email} onChange={handleChange} 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.contact.form_phone}</label>
                            <input 
                                type="text" name="phone" required 
                                className="input-field w-full bg-gray-50 border-gray-200 focus:bg-white p-3" 
                                placeholder={t.contact.form_phone_ph} 
                                value={formData.phone} onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* RIGA 4: MESSAGGIO (Non required) */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.contact.form_msg}</label>
                        {/* Rimosso 'required' da qui */}
                        <textarea 
                            name="message" rows="4" 
                            className="input-field w-full bg-gray-50 border-gray-200 focus:bg-white resize-none p-3" 
                            placeholder={t.contact.form_msg_ph} 
                            value={formData.message} onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" disabled={status === 'loading'} className="w-full btn-primary flex justify-center items-center gap-2 py-4 text-lg shadow-lg mt-2">
                        {status === 'loading' ? t.contact.sending : <>{t.contact.btn_send} <Send size={20}/></>}
                    </button>
                    {status === 'error' && (<p className="text-red-600 text-sm font-bold text-center mt-2">{t.contact.error}</p>)}
                </form>
             )}
          </div>

        </div>
      </div>
    </section>
  );
};
export default ContactSection;