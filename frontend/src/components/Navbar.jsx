import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { trackPhoneClick } from '../utils/analytics';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, changeLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Classi dinamiche per il testo: Bianco su Hero, Blu scuro su sfondo bianco
  const textClass = scrolled ? 'text-brand-900 hover:text-brand-600' : 'text-white hover:text-brand-accent';
  const logoClass = scrolled ? 'h-8 md:h-10' : 'h-8 md:h-10 brightness-0 invert'; // Logo originale vs Logo Bianco

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 flex items-center">
            {/* Logo cambia visualizzazione in base allo scroll */}
            <img src="https://www.scaravella.it/wp-content/uploads/2020/11/Logo_Web_2020.png" alt="Scaravella F.lli" className={`transition-all ${logoClass}`} />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('prodotto')} className={`nav-link text-sm font-bold uppercase tracking-wider transition-colors ${textClass}`}>{t.nav.product}</button>
            <button onClick={() => scrollToSection('vantaggi')} className={`nav-link text-sm font-bold uppercase tracking-wider transition-colors ${textClass}`}>{t.nav.benefits}</button>
            <button onClick={() => scrollToSection('catalogo')} className={`nav-link text-sm font-bold uppercase tracking-wider transition-colors ${textClass}`}>{t.nav.catalog}</button>
            
            {/* Pulsante Lingua */}
            <button 
                onClick={() => changeLanguage(language === 'it' ? 'en' : 'it')}
                className={`flex items-center gap-1 border px-3 py-1 rounded transition-colors text-xs font-bold ${scrolled ? 'border-brand-900 text-brand-900 hover:bg-brand-50' : 'border-white/30 text-white hover:bg-white/10'}`}
            >
                <Globe size={14} /> {language.toUpperCase()}
            </button>

            <div className={`flex items-center gap-4 pl-4 border-l ${scrolled ? 'border-gray-200' : 'border-gray-700'}`}>
                <a href="tel:+390523480192" onClick={() => trackPhoneClick('navbar')} className={`flex items-center gap-2 transition-colors ${scrolled ? 'text-brand-900 hover:text-brand-600' : 'text-brand-accent hover:text-white'}`}>
                    <Phone size={18} />
                    <span className="font-bold">{t.nav.phone_label}</span>
                </a>
                <button onClick={() => scrollToSection('contatti')} className="bg-brand-900 border border-brand-900 text-white hover:bg-white hover:text-brand-900 px-5 py-2 font-bold uppercase text-xs tracking-widest transition-all">
                    {t.nav.contact}
                </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
             <button onClick={() => changeLanguage(language === 'it' ? 'en' : 'it')} className={`flex items-center gap-1 border px-2 py-1 rounded text-xs font-bold ${scrolled ? 'border-brand-900 text-brand-900' : 'border-white/30 text-white'}`}>
                {language.toUpperCase()}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors ${textClass}`}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile: SFONDO BIANCO */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl text-brand-900">
          <div className="px-4 pt-4 pb-8 space-y-4">
            <button onClick={() => scrollToSection('prodotto')} className="block w-full text-left hover:text-brand-600 font-bold uppercase py-2 border-b border-gray-100">{t.nav.product}</button>
            <button onClick={() => scrollToSection('vantaggi')} className="block w-full text-left hover:text-brand-600 font-bold uppercase py-2 border-b border-gray-100">{t.nav.benefits}</button>
            <button onClick={() => scrollToSection('catalogo')} className="block w-full text-left hover:text-brand-600 font-bold uppercase py-2 border-b border-gray-100">{t.nav.catalog}</button>
            <a href="tel:+390523480192" onClick={() => trackPhoneClick('navbar_mobile')} className="flex items-center gap-3 text-brand-900 py-2">
                <Phone size={20} /> <span className="font-bold text-lg">{t.nav.phone_label}</span>
            </a>
            <button onClick={() => scrollToSection('contatti')} className="w-full mt-4 bg-brand-accent text-brand-900 font-bold uppercase py-3 tracking-widest">
                {t.nav.contact}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;