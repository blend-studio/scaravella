import React, { useState } from 'react';
import { ChevronRight, Globe, Award, TrendingDown, History } from 'lucide-react';
import ContactModal from './ContactModal';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';

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
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297461136-82bf9ce253e1?auto=format&fit=crop&q=80')] bg-cover bg-center pointer-events-none" 
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* SINISTRA: Testo */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={itemVariants}>
                  <div className="inline-block bg-brand-accent text-brand-900 font-bold text-[10px] sm:text-xs px-2 py-1 mb-4 uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                    {t.hero.badge}
                  </div>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-tight mb-5">
                {t.hero.title_1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">{t.hero.title_2}</span>
              </motion.h1>

              {/* MODIFICATO QUI: Font Size aumentato (text-lg sm:text-xl) */}
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-400 mb-8 font-light border-l-4 border-brand-accent pl-5 leading-relaxed">
                {t.hero.subtitle}
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.05, backgroundColor: "#facc15" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer text-center text-sm"
                >
                  {t.hero.btn_contact} <ChevronRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* DESTRA: Box */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 hover:bg-white/10 transition-colors duration-300 group">
                  <item.icon size={28} className="text-brand-accent mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-bold uppercase text-xs sm:text-sm tracking-wide leading-relaxed">{item.text}</h3>
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