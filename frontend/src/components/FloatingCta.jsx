import React, { useState, useEffect } from 'react';
import { MessageSquareText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

const FloatingCta = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Appare dopo 300px di scroll per non coprire la Hero iniziale
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            // CLASSI RESPONSIVE:
            // Mobile: bottom-5 right-5 (più vicino all'angolo)
            // Desktop: bottom-8 right-8 (più arioso)
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 bg-brand-accent text-brand-900 p-3 md:p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-2 border-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 group flex items-center gap-3"
          >
            {/* Cerchio pulsante per attirare l'attenzione (disabilitato in hover) */}
            <span className="absolute inset-0 rounded-full bg-brand-accent opacity-40 animate-ping group-hover:hidden"></span>
            
            <MessageSquareText size={24} className="md:w-6 md:h-6" strokeWidth={2.5} />
            
            {/* TESTO PREVENTIVO:
                - hidden: nascosto su mobile piccolissimo
                - sm:block: visibile da 640px in su (Tablet e Desktop)
            */}
            <span className="hidden sm:block font-black uppercase tracking-wider text-xs md:text-sm whitespace-nowrap pr-1">
                Preventivo
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FloatingCta;