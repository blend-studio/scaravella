import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductIntro from './components/ProductIntro';
import VideoSection from './components/VideoSection'; // <--- Importa il Video
import CatalogSection from './components/CatalogSection';
import ContactSection from './components/ContactSection';
import { Truck, ShieldCheck, Banknote } from 'lucide-react';

const ValueProps = () => (
  <section id="vantaggi" className="py-24 bg-gray-50 border-t border-gray-200">
    {/* ... (Codice ValueProps invariato) ... */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black text-brand-900 uppercase tracking-wide">Perché sceglierci</h2>
        <div className="w-12 h-1 bg-brand-accent mx-auto mt-6"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Truck, title: "Spedizioni Rapide", desc: "Magazzino fornito con misure standard per ridurre al minimo i tuoi fermi macchina. Spediamo in 24/48h." },
          { icon: ShieldCheck, title: "Qualità ISO", desc: "Acciai rettificati e controlli dimensionali rigorosi su ogni singolo pezzo in uscita dalla produzione." },
          { icon: Banknote, title: "Prezzo Diretto", desc: "Dal produttore al cliente finale. Saltiamo gli intermediari per offrirti il miglior rapporto qualità-prezzo." }
        ].map((item, i) => (
          <div key={i} className="group bg-white p-10 shadow-sm border-b-4 border-transparent hover:border-brand-accent hover:shadow-xl transition-all duration-300">
            <div className="mb-6 inline-block p-4 bg-gray-50 rounded-full group-hover:bg-brand-accent group-hover:text-brand-900 transition-colors">
              <item.icon size={32} className="text-brand-600 group-hover:text-brand-900" />
            </div>
            <h3 className="text-xl font-black text-brand-900 uppercase mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-900 text-gray-500 py-16 text-sm border-t border-brand-800">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <img 
          src="https://www.scaravella.it/wp-content/uploads/2020/11/Logo_Web_2020.png" 
          alt="Scaravella Logo" 
          className="h-12 mb-4 brightness-0 invert opacity-50 mx-auto md:mx-0" 
        />
        <p className="max-w-xs">Specialisti nella movimentazione lineare e componentistica per l'automazione industriale.</p>
      </div>
      <div className="text-center md:text-right">
        <p>© {new Date().getFullYear()} Scaravella F.lli S.r.l.</p>
        <p className="mt-2">Piacenza (PC) - Italy</p>
        <p className="mt-2 font-bold text-brand-600">info@scaravella.it</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductIntro />
        
        {/* Inserimento Video Section qui, per spezzare il ritmo tra intro e vantaggi */}
        <VideoSection /> 

        <ValueProps />
        <CatalogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;