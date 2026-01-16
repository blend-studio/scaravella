import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

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
    <section id="contatti" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* COLONNA SINISTRA: Info + Mappa + FOTO TECNICO */}
          <div>
            <div className="flex items-center gap-4 mb-6">
               <h4 className="text-brand-600 font-bold uppercase tracking-widest text-sm">Siamo qui per te</h4>
               <div className="h-px bg-brand-600 w-12"></div>
            </div>
            
            <h2 className="text-3xl font-black text-brand-900 uppercase mb-8">
              Parla con il nostro<br/>Ufficio Tecnico
            </h2>

            {/* BOX PERSONALE - NUOVO! */}
            <div className="bg-slate-50 border border-slate-200 p-6 flex items-center gap-6 mb-10 rounded-none shadow-sm">
                <img 
                    src="https://lh3.googleusercontent.com/p/AF1QipOleWK_gnBKTP0GUZXiBUVXlmKWtE5aBLwYYTEa=s680-w680-h510-rw" 
                    alt="Responsabile Tecnico" 
                    className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
                <div>
                    <p className="text-brand-900 font-black uppercase text-lg">Supporto Diretto</p>
                    <p className="text-gray-600 text-sm mb-2">I nostri esperti ti guidano nella scelta del dimensionamento corretto.</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 font-bold uppercase rounded-sm">Risposta in 4h</span>
                </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed border-l-4 border-brand-accent pl-4">
              Hai bisogno di una lavorazione speciale o di una fornitura urgente? 
              Compila il modulo a fianco o chiamaci direttamente.
            </p>

            {/* Dettagli Contatto */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <Phone className="text-brand-accent mt-1" size={20}/>
                <div>
                  <p className="font-bold text-brand-900 text-xs uppercase">Telefono</p>
                  <p className="text-gray-700 font-bold">+39 0523 000000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-brand-accent mt-1" size={20}/>
                <div>
                  <p className="font-bold text-brand-900 text-xs uppercase">Email</p>
                  <p className="text-brand-600 font-bold">info@scaravella.it</p>
                </div>
              </div>
            </div>

            {/* MAPPA GOOGLE */}
            <div className="w-full h-64 bg-gray-200 relative shadow-lg border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5637.4006131997785!2d9.653068176589006!3d45.05130316089264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4780dd264203912f%3A0xd7dd76500efdf466!2sScaravella%20Fratelli%20S.r.l.!5e0!3m2!1sit!2sit!4v1768561249520!5m2!1sit!2sit" 
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Sede Scaravella"
              ></iframe>
            </div>
          </div>

          {/* COLONNA DESTRA: Form (Invariato nella logica, migliorato nello stile) */}
          <div className="bg-brand-900 p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            {status === 'success' ? (
               <div className="h-full flex flex-col justify-center items-center text-center py-12">
                 <CheckCircle size={64} className="text-green-400 mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">Richiesta Ricevuta</h3>
                 <p className="text-gray-300 mb-6">Grazie. Ti risponderemo al più presto.</p>
                 <button onClick={() => setStatus('idle')} className="text-brand-accent underline font-bold uppercase text-sm hover:text-white transition-colors">Nuova richiesta</button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h3 className="text-xl font-black uppercase text-white mb-6 border-b border-brand-800 pb-4">Inviaci una richiesta</h3>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-accent mb-2">Nome e Cognome</label>
                  <input 
                    type="text" required 
                    className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none transition-all placeholder-gray-500"
                    placeholder="Il tuo nome"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-accent mb-2">Email Aziendale</label>
                    <input 
                      type="email" required 
                      className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none placeholder-gray-500"
                      placeholder="email@azienda.it"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-accent mb-2">Telefono</label>
                    <input 
                      type="text" 
                      className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none placeholder-gray-500"
                      placeholder="+39 ..."
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-brand-accent mb-2">Messaggio</label>
                  <textarea 
                    rows="4" required 
                    className="w-full bg-brand-800 border border-brand-700 text-white p-4 focus:ring-1 focus:ring-brand-accent outline-none resize-none placeholder-gray-500"
                    placeholder="Specifiche tecniche, quantità, urgenza..."
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-accent text-brand-900 font-black uppercase tracking-widest py-4 hover:bg-white transition-all shadow-lg flex justify-center items-center gap-2">
                  {status === 'loading' ? 'Invio...' : <>INVIA ORA <Send size={18} /></>}
                </button>
                
                {status === 'error' && (
                   <p className="text-red-400 text-xs font-bold text-center mt-2 flex justify-center items-center gap-2">
                     <AlertCircle size={14}/> Errore di connessione.
                   </p>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;