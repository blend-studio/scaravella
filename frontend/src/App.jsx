import React, { useState } from 'react';
import axios from 'axios';
import { Download, CheckCircle, Truck, ShieldCheck, Banknote, Mail, Phone, Menu, X } from 'lucide-react';

// URL del backend (assicurati di lanciare il server PHP sulla porta 8000)
const API_URL = 'http://localhost:8000/api';

function App() {
  return (
    <div className="font-sans antialiased text-slate-800">
      <Navbar />
      <Hero />
      <ValueProps />
      <CatalogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

// --- Componenti UI ---

const Navbar = () => (
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div className="flex items-center">
          <span className="text-2xl font-black text-brand-900 tracking-tighter uppercase">Scaravella<span className="text-brand-600">.it</span></span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#vantaggi" className="text-gray-600 hover:text-brand-600 font-medium">Vantaggi</a>
          <a href="#catalogo" className="text-gray-600 hover:text-brand-600 font-medium">Catalogo</a>
          <a href="#contatti" className="px-5 py-2 bg-brand-900 text-white hover:bg-brand-800 font-bold text-sm uppercase">Richiedi Preventivo</a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div className="relative bg-brand-900 text-white py-24 lg:py-32">
    <div className="absolute inset-0 overflow-hidden opacity-20">
       {/* Placeholder per sfondo tecnico/meccanico */}
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
        Viti a Ricircolo di Sfere <br/>
        <span className="text-brand-600 bg-white px-2">Alta Precisione</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl font-light">
        La soluzione definitiva per l'automazione industriale. 
        Affidabilità meccanica e disponibilità immediata per il tuo business.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#catalogo" className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent hover:bg-orange-600 text-white font-bold text-lg uppercase shadow-lg">
          <Download size={20} /> Scarica Catalogo
        </a>
        <a href="#contatti" className="flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-brand-900 text-white font-bold text-lg uppercase transition-colors">
          Parla con un tecnico
        </a>
      </div>
    </div>
  </div>
);

const ValueProps = () => {
  const features = [
    {
      icon: <Truck size={40} className="text-brand-600" />,
      title: "Delivery Veloce",
      desc: "Sappiamo che il fermo macchina costa. Garantiamo spedizioni rapide e magazzino sempre fornito per le misure standard."
    },
    {
      icon: <ShieldCheck size={40} className="text-brand-600" />,
      title: "Qualità Certificata",
      desc: "Acciai trattati termicamente e rettifiche di precisione. I nostri prodotti superano i più rigidi standard industriali."
    },
    {
      icon: <Banknote size={40} className="text-brand-600" />,
      title: "Prezzo Competitivo",
      desc: "Tagliamo gli intermediari superflui per offrirti il miglior rapporto qualità-prezzo sul mercato italiano."
    }
  ];

  return (
    <div id="vantaggi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-brand-900 uppercase tracking-wide">Perché sceglierci</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-50 p-8 border border-gray-100 hover:border-brand-600 hover:shadow-xl transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 uppercase">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CatalogSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleDownload = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post(`${API_URL}/download-catalog`, { email });
      if (response.data.status === 'success') {
        setStatus('success');
        // Trigger download
        window.location.href = response.data.link;
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div id="catalogo" className="bg-slate-100 py-24">
      <div className="max-w-4xl mx-auto px-4 bg-white p-12 shadow-2xl border-l-8 border-brand-accent">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-black text-brand-900 uppercase mb-4">Schede Tecniche Complete</h3>
            <p className="text-gray-600 mb-6">Inserisci la tua email per scaricare immediatamente il catalogo completo in PDF con tutte le misure, i carichi statici/dinamici e i disegni tecnici.</p>
            <ul className="space-y-2 mb-6 text-sm text-gray-500">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Specifiche ISO/DIN</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Tabelle di carico</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Guide alla lubrificazione</li>
            </ul>
          </div>
          <div className="md:w-1/2 w-full">
            {status === 'success' ? (
              <div className="bg-green-50 text-green-800 p-6 border border-green-200 text-center">
                <CheckCircle size={48} className="mx-auto mb-2 text-green-600" />
                <p className="font-bold">Download avviato!</p>
                <p className="text-sm">Controlla la tua cartella download.</p>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Aziendale</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="nome@azienda.it" 
                    className="w-full bg-gray-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full bg-brand-900 text-white py-4 hover:bg-brand-800 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                   {status === 'loading' ? 'Elaborazione...' : <><Download size={18} /> Scarica PDF</>}
                </button>
                {status === 'error' && <p className="text-red-500 text-sm text-center">Errore nel download. Riprova.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(`${API_URL}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div id="contatti" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black text-brand-900 uppercase mb-6">Richiedi informazioni</h2>
            <p className="text-gray-600 mb-8">
              Hai bisogno di una misura fuori standard o di una fornitura urgente? 
              Compila il modulo. Il nostro reparto tecnico risponde solitamente entro 4 ore lavorative.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-700">
                <div className="p-3 bg-slate-100"><Phone className="text-brand-600"/></div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Telefono</p>
                  <p className="font-bold text-lg">+39 0523 000000</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <div className="p-3 bg-slate-100"><Mail className="text-brand-600"/></div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Email</p>
                  <p className="font-bold text-lg">info@scaravella.it</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 border border-gray-200">
            {status === 'success' ? (
               <div className="text-center py-12">
                 <h3 className="text-2xl font-bold text-brand-900 mb-2">Messaggio Ricevuto</h3>
                 <p className="text-gray-600">Grazie per averci contattato. Ti risponderemo a breve.</p>
                 <button onClick={() => setStatus('idle')} className="mt-6 text-brand-600 underline">Invia un altro messaggio</button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" placeholder="Nome e Cognome" required 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="text" placeholder="Telefono" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <input 
                  type="email" placeholder="Email Aziendale" required className="w-full"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <textarea 
                  rows="4" placeholder="Descrivi la tua richiesta (es. Diametro, Passo, Quantità...)" required className="w-full"
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
                <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-accent text-white py-4 font-bold hover:bg-orange-600 uppercase">
                  {status === 'loading' ? 'Invio in corso...' : 'Invia Richiesta'}
                </button>
                {status === 'error' && <p className="text-red-500 text-sm mt-2">Errore nell'invio. Riprova.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-brand-900 text-gray-400 py-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 text-center sm:text-left sm:flex justify-between items-center">
      <div>
        <span className="text-2xl font-black text-white uppercase tracking-tighter">Scaravella<span className="text-brand-600">.it</span></span>
        <p className="mt-2 text-sm">Specialisti in trasmissione meccanica.</p>
      </div>
      <div className="mt-6 sm:mt-0 text-sm">
        <p>&copy; {new Date().getFullYear()} Scaravella F.lli S.r.l. - P.IVA 00000000000</p>
      </div>
    </div>
  </footer>
);

export default App;