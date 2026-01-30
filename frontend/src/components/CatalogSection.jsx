import React, { useState } from 'react';
import axios from 'axios';
import { ExternalLink, FileText, CheckSquare, AlertCircle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const CatalogSection = () => {
  // Aggiornato stato iniziale: firstname, lastname separati
  const [formData, setFormData] = useState({ firstname: '', lastname: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle');
  const { t, language } = useTranslation();

  const handleDownload = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post('https://ballscrews.it/api/download-catalog', { ...formData, lang: language });
      if (response.data.status === 'success') {
        setStatus('success');
        window.location.href = response.data.link;
      }
    } catch (err) { setStatus('error'); }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="catalogo" className="py-12 md:py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white shadow-2xl flex flex-col lg:flex-row">
          
          {/* Info Side */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 bg-brand-900 text-white relative overflow-hidden">
             <div className="relative z-10">
                <FileText size={64} className="text-brand-accent mb-6" />
                <h2 className="text-3xl font-black uppercase mb-4">{t.catalog.title}</h2>
                <p className="text-gray-400 mb-8 text-lg">{t.catalog.desc}</p>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3"><CheckSquare className="text-brand-accent"/> {t.catalog.list_1}</li>
                  <li className="flex items-center gap-3"><CheckSquare className="text-brand-accent"/> {t.catalog.list_2}</li>
                </ul>
             </div>
             <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-accent rounded-full opacity-10 blur-3xl"></div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center">
            <div className="w-full">
              {status === 'success' ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <h4 className="font-bold text-green-800 uppercase mb-2">{t.catalog.redirect}</h4>
                  <p className="text-sm text-green-700">{t.catalog.redirect_desc}</p>
                </div>
              ) : (
                <form onSubmit={handleDownload} className="space-y-5">
                  <h3 className="text-2xl font-black uppercase text-brand-900 mb-6">{t.catalog.form_title}</h3>
                  
                  {/* NOME e COGNOME separati */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.catalog.form_firstname}</label>
                        <input 
                            type="text" name="firstname" required 
                            className="input-field w-full p-3" 
                            placeholder={t.catalog.form_firstname_ph} 
                            value={formData.firstname} onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.catalog.form_lastname}</label>
                        <input 
                            type="text" name="lastname" required 
                            className="input-field w-full p-3" 
                            placeholder={t.catalog.form_lastname_ph} 
                            value={formData.lastname} onChange={handleChange} 
                        />
                    </div>
                  </div>

                  {/* TELEFONO */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.catalog.phone_label}</label>
                    <input 
                        type="text" name="phone" required 
                        className="input-field w-full p-3" 
                        placeholder={t.catalog.phone_ph} 
                        value={formData.phone} onChange={handleChange} 
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t.catalog.email_label}</label>
                    <input 
                        type="email" name="email" required 
                        className="input-field w-full p-3" 
                        placeholder="nome@azienda.it" 
                        value={formData.email} onChange={handleChange} 
                    />
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="w-full btn-primary flex justify-center items-center gap-2 mt-6 py-4 text-lg">
                    {status === 'loading' ? t.catalog.loading : <>{t.catalog.btn_download} <ExternalLink size={20}/></>}
                  </button>
                  
                  {status === 'error' && (<div className="flex items-center gap-2 text-red-600 text-sm font-bold mt-2"><AlertCircle size={16} /> {t.catalog.error}</div>)}
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