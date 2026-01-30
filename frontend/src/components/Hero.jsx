import React, { useState } from 'react';
import { ChevronRight, Globe, Award, TrendingDown, History } from 'lucide-react';
import ContactModal from './ContactModal';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';

// IMPORTA L'IMMAGINE LOCALE
import heroBg from '../assets/scaravella-Pro.jpg'; 

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const features = [
    { icon: Globe, text: t.hero.box_1 },
    { icon: Award, text: t.hero.box_2 },
    { icon: TrendingDown, text: t.hero.box_3 },
    { icon: History, text: t.hero.box_4 },
  ];

  return (
    <>
      <section className="relative bg-brand-900 text-white pt-32 pb-20 lg:py-36 overflow-hidden">
        
        {/* --- SFONDO CON IMMAGINE E OVERLAY --- */}
        <div className="absolute inset-0 z-0">
            {/* 1. Immagine di Sfondo */}
            <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${heroBg}')` }}
            />
            
            {/* 2. Overlay Blu: Ridotto al 30% (molto più chiaro) */}
            <div className="absolute inset-0 bg-brand-900/30 mix-blend-multiply" />
            
            {/* 3. Gradiente Nero: Ridotto al 40% (solo per staccare il testo a sinistra) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        </div>
        
        {/* Contenuto (z-10 per stare sopra l'immagine) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* SINISTRA: Testo */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={itemVariants}>
                  <div className="inline-block bg-brand-accent text-brand-900 font-bold text-[10px] sm:text-xs px-2 py-1 mb-4 uppercase tracking-wider shadow-md">
                    {t.hero.badge}
                  </div>
              </motion.div>

              {/* Aggiunto drop-shadow-lg per leggere il testo su sfondo chiaro */}
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-tight mb-5 drop-shadow-lg">
                {t.hero.title_1} <br />
                <span className="text-white">{t.hero.title_2}</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/90 mb-8 font-medium border-l-4 border-brand-accent pl-5 leading-relaxed drop-shadow-md">
                {t.hero.subtitle}
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.05, backgroundColor: "#facc15" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer text-center text-sm shadow-xl"
                >
                  {t.hero.btn_contact} <ChevronRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* DESTRA: Box */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, index) => (
                // Box semitrasparenti scuri per contrasto
                <motion.div key={index} variants={itemVariants} className="bg-black/40 backdrop-blur-md border border-white/20 p-5 hover:bg-black/50 transition-colors duration-300 group rounded-sm shadow-lg">
                  <item.icon size={28} className="text-brand-accent mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-bold uppercase text-xs sm:text-sm tracking-wide leading-relaxed drop-shadow-sm">{item.text}</h3>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;