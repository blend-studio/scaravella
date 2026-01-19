import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import ContactModal from './ContactModal';

const CtaStrip = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-brand-accent py-10 md:py-12 border-y border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-black text-brand-900 uppercase leading-tight">
                {t.cta_strip.text}
              </h3>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-shrink-0 bg-brand-900 text-white hover:bg-white hover:text-brand-900 font-bold uppercase tracking-widest py-4 px-8 transition-all shadow-lg flex items-center gap-3 text-sm md:text-base"
            >
              {t.cta_strip.btn} <ArrowRight size={20} />
            </button>

          </div>
        </div>
      </section>
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CtaStrip;