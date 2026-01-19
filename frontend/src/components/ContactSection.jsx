import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const ContactSection = () => {
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
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contatti" className="py-12 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          <div>
            <div className="flex items-center gap-4 mb-6">
               <h4 className="text-brand-600 font-bold uppercase tracking-widest text-sm">{t.contact.label}</h4>
               <div className="h-px bg-brand-600 w-12"></div>
            </div>
            
            <h2 className="text-3xl font-black text-brand-900 uppercase mb-8">{t.contact.title}</h2>

            <div className="bg-slate-50 border border-slate-200 p-6 mb-10 rounded-none shadow-sm">
                <div>
                    <p className="text-brand-900 font-black uppercase text-lg">{t.contact.box_title}</p>
                    <p className="text-gray-600 text-sm mb-2 mt-1">{t.contact.box_desc}</p>
                    <div className="mt-3"><span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 font-bold uppercase rounded-sm">{t.contact.box_badge}</span></div>
                </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed border-l-4 border-brand-accent pl-4">{t.contact.intro}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <Phone className="text-brand-accent mt-1" size={20}/>
                <div><p className="font-bold text-brand-900 text-xs uppercase">{t.contact.phone_label}</p><p className="text-gray-700 font-bold">+39 0523 000000</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-brand-accent mt-1" size={20}/>
                <div><p className="font-bold text-brand-900 text-xs uppercase">{t.contact.email_label}</p><p className="text-brand-600 font-bold">info@scaravella.it</p></div>
              </div>
            </div>

            <div className="w-full h-64 md:h-80 bg-gray-200 relative shadow-lg border-4 border-white">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5637.4006131997785!2d9.653068176589006!3d45.05130316089264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4780dd264203912f%3A0xd7dd76500efdf466!2sScaravella%20Fratelli%20S.r.l.!5e0!3m2!1sit!2sit!4v1768561249520!5m2!1sit!2sit" className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mappa Sede Scaravella"></iframe>
            </div>
          </div>

          <div className="bg-brand-900 p-6 md:p-10 text-white shadow-2xl relative overflow-hidden mt-8 lg:mt-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            {status === 'success' ? (
               <div className="h-full flex flex-col justify-center items-center text-center py-12">
                 <CheckCircle size={64} className="text-green-400 mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">{t.contact.success_title}</h3>
                 <p className="text-gray-300 mb-6">{t.contact.success_desc}</p>
                 <button onClick={() => setStatus('idle')} className="text-brand-accent underline font-bold uppercase text-sm hover:text-white transition-colors">{t.contact.new_req}</button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h3 className="text-xl font-black uppercase text-white mb-6 border-b border-brand-800 pb-4">{t.contact.form_title}</h3>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-accent mb-2">{t.contact.form_name}</label>
                  <input type="text" required className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none transition-all placeholder-gray-500" placeholder={t.contact.form_name_ph} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-accent mb-2">{t.contact.form_email}</label>
                    <input type="email" required className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none placeholder-gray-500" placeholder={t.contact.form_email_ph} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-accent mb-2">{t.contact.form_phone}</label>
                    <input type="text" className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none placeholder-gray-500" placeholder={t.contact.form_phone_ph} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-brand-accent mb-2">{t.contact.form_msg}</label>
                  <textarea rows="4" required className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none resize-none placeholder-gray-500" placeholder={t.contact.form_msg_ph} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-accent text-brand-900 font-black uppercase tracking-widest py-4 hover:bg-white transition-all shadow-lg flex justify-center items-center gap-2">
                  {status === 'loading' ? t.contact.sending : <>{t.contact.btn_send} <Send size={18} /></>}
                </button>
                {status === 'error' && ( <p className="text-red-400 text-xs font-bold text-center mt-2 flex justify-center items-center gap-2"><AlertCircle size={14}/> {t.contact.error}</p> )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;