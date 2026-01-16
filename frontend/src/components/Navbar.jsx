import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center"> {/* Aumentata leggermente altezza a h-24 */}
          
          {/* Logo Scaravella */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              className="h-16 w-auto" /* Altezza controllata */
              src="https://www.scaravella.it/wp-content/uploads/2020/11/Logo_Web_2020.png" 
              alt="Scaravella F.lli" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#prodotto" className="text-sm font-bold uppercase text-gray-600 hover:text-brand-600 tracking-wide">Il Prodotto</a>
            <a href="#vantaggi" className="text-sm font-bold uppercase text-gray-600 hover:text-brand-600 tracking-wide">Vantaggi</a>
            <a href="#catalogo" className="text-sm font-bold uppercase text-gray-600 hover:text-brand-600 tracking-wide">Catalogo</a>
            
            <div className="flex items-center gap-2 text-brand-900 font-bold border-l-2 border-gray-100 pl-6">
              <Phone size={18} className="text-brand-accent fill-current" />
              <span>0523 000000</span>
            </div>
            
            <a href="#contatti" className="px-6 py-3 bg-brand-900 text-white font-bold text-xs uppercase hover:bg-brand-800 transition-all shadow-md hover:shadow-lg">
              Preventivo Rapido
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-900 p-2">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-900 text-white border-t border-brand-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#prodotto" className="block py-3 font-bold uppercase tracking-wider border-b border-brand-800" onClick={() => setIsOpen(false)}>Il Prodotto</a>
            <a href="#vantaggi" className="block py-3 font-bold uppercase tracking-wider border-b border-brand-800" onClick={() => setIsOpen(false)}>Vantaggi</a>
            <a href="#catalogo" className="block py-3 font-bold uppercase tracking-wider border-b border-brand-800" onClick={() => setIsOpen(false)}>Catalogo</a>
            <a href="#contatti" className="block py-3 font-bold uppercase text-brand-accent mt-4" onClick={() => setIsOpen(false)}>Contattaci Ora</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;