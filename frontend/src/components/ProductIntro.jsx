import React, { useState } from 'react';
import { CheckSquare, ArrowRight } from 'lucide-react';
import { Reveal, SlideIn } from './Reveal';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import ContactModal from './ContactModal';

const ProductIntro = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section id="prodotto" className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MODIFICA QUI: cambiato 'md:flex-row' in 'lg:flex-row' */}
        {/* Questo fa sì che su iPad Verticale (md) resti in colonna (più leggibile) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* COLONNA TESTO */}
          {/* MODIFICA QUI: cambiato 'md:w-1/2' in 'lg:w-1/2' */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <SlideIn direction="left">
                <h4 className="text-brand-600 font-bold uppercase tracking-widest mb-2 text-xs md:text-sm">{t.product.label}</h4>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-900 uppercase mb-6 leading-tight">
                {t.product.title}
                </h2>
                <div className="w-20 h-1 bg-brand-accent mb-8"></div>
                
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.product.desc_1 }}></p>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.product.desc_2 }}></p>
            </SlideIn>

            <Reveal delay={0.4}>
                <ul className="space-y-4 font-medium text-brand-900 text-lg mb-12">
                {t.product.features.map((feature, index) => (
                    <motion.li 
                        key={index}
                        whileHover={{ x: 10, color: "#2563eb" }}
                        className="flex items-center gap-3 cursor-default"
                    >
                        <CheckSquare className="text-brand-accent flex-shrink-0" /> {feature}
                    </motion.li>
                ))}
                </ul>

                <motion.button 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-4 cursor-pointer focus:outline-none"
                >
                    <span className="text-brand-900 font-black uppercase tracking-wide text-lg border-b-4 border-brand-accent pb-1 group-hover:border-brand-600 group-hover:text-brand-600 transition-all duration-300">
                        {t.product.btn_details}
                    </span>
                    <div className="bg-brand-900 text-white p-2 rounded-full group-hover:bg-brand-600 transition-colors duration-300">
                        <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </motion.button>

            </Reveal>
          </div>

          {/* COLONNA IMMAGINE */}
          {/* MODIFICA QUI: cambiato 'md:w-1/2' in 'lg:w-1/2' e 'md:order-2' in 'lg:order-2' */}
          <div className="w-full lg:w-1/2 relative group order-1 lg:order-2">
            <SlideIn direction="right" delay={0.3}>
                <div className="absolute inset-0 bg-brand-accent transform translate-x-4 translate-y-4 z-0 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-300"></div>
                <img 
                src="https://www.scaravella.it/wp-content/uploads/2021/03/Scaravella_Vite_ricircolo_sfere_32passo10-scaled.jpg" 
                alt="Vite a Ricircolo di Sfere Scaravella" 
                className="relative z-10 shadow-2xl transition-all duration-500 w-full object-cover h-auto border-4 border-white grayscale group-hover:grayscale-0"
                />
            </SlideIn>
          </div>

        </div>
      </div>
    </section>
    
    <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ProductIntro;