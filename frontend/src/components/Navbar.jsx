import React, { useState } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react'; // Aggiungi Globe
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext'; // Import Hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, toggleLanguage } = useTranslation(); // Usa Hook

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-24 items-center">
          
          <div className="flex-shrink-0 flex items-center">
            <img className="h-10 md:h-16 w-auto transition-all duration-300" src="https://www.scaravella.it/wp-content/uploads/2020/11/Logo_Web_2020.png" alt="Scaravella" />
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#prodotto" className="text-sm font-bold uppercase text-gray-600 hover:text-brand-600 tracking-wide">{t.nav.product}</a>
            <a href="#vantaggi" className="text-sm font-bold uppercase text-gray-600 hover:text-brand-600 tracking-wide">{t.nav.benefits}</a>
            <a href="#catalogo" className="text-sm font-bold uppercase text-gray-600 hover:text-brand-600 tracking-wide">{t.nav.catalog}</a>
            
            {/* Language Switcher Desktop */}
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm font-bold uppercase text-brand-900 hover:text-brand-600 border px-2 py-1 border-gray-300">
               <Globe size={16} /> {language === 'it' ? 'EN' : 'IT'}
            </button>

            <div className="flex items-center gap-2 text-brand-900 font-bold border-l-2 border-gray-100 pl-6">
              <Phone size={18} className="text-brand-accent fill-current" />
              <a href={`tel:${t.nav.phone_label.replace(/\s+/g, '')}`} className="hover:underline">{t.nav.phone_label}</a>
            </div>
            
            <a href="#contatti" className="px-5 lg:px-6 py-3 bg-brand-900 text-white font-bold text-xs uppercase hover:bg-brand-800 transition-all shadow-md hover:shadow-lg">
              {t.nav.contact}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
             {/* Language Switcher Mobile */}
            <button onClick={toggleLanguage} className="font-bold text-brand-900 border border-gray-300 px-2 py-1 text-sm">
                {language === 'it' ? 'EN' : 'IT'}
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-900 p-2 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-brand-900 text-white border-t border-brand-800 overflow-hidden">
            <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col items-center text-center">
              <a href="#prodotto" className="text-lg font-bold uppercase tracking-wider w-full py-2 border-b border-brand-800" onClick={() => setIsOpen(false)}>{t.nav.product}</a>
              <a href="#vantaggi" className="text-lg font-bold uppercase tracking-wider w-full py-2 border-b border-brand-800" onClick={() => setIsOpen(false)}>{t.nav.benefits}</a>
              <a href="#catalogo" className="text-lg font-bold uppercase tracking-wider w-full py-2 border-b border-brand-800" onClick={() => setIsOpen(false)}>{t.nav.catalog}</a>
              
              <div className="py-4">
                 <p className="text-gray-400 text-xs uppercase mb-1">{t.nav.call_us}</p>
                 <a href="tel:+390523480192" className="text-2xl font-black text-white flex items-center justify-center gap-2">
                    <Phone className="text-brand-accent"/> 0523 480192
                 </a>
              </div>

              <a href="#contatti" className="w-full bg-brand-accent text-brand-900 py-4 font-black uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;