import React, { useState } from 'react';
import { Download, ChevronRight } from 'lucide-react';
import ContactModal from './ContactModal';
import { motion } from 'framer-motion'; // <--- Import Motion

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Varianti per l'animazione a cascata
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Ritardo tra un elemento e l'altro
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <>
      <section className="relative bg-brand-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Sfondo con leggero effetto Parallax/Zoom iniziale */}
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297461136-82bf9ce253e1?auto=format&fit=crop&q=80')] bg-cover bg-center pointer-events-none" 
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
                <div className="inline-block bg-brand-accent text-brand-900 font-bold text-xs px-2 py-1 mb-6 uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                Leader nelle trasmissioni meccaniche
                </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
              Viti a Ricircolo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">di Sfere</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-10 max-w-2xl font-light border-l-4 border-brand-accent pl-6">
              Precisione micrometrica, consegna immediata e qualità certificata. 
              Il partner affidabile per la tua automazione industriale.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              {/* Bottone Primario Animato */}
              <motion.a 
                href="#catalogo" 
                whileHover={{ scale: 1.05, backgroundColor: "#facc15" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-3 cursor-pointer"
              >
                <Download size={20} /> Scarica Catalogo
              </motion.a>
              
              {/* Bottone Secondario Animato */}
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#0f172a" }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center justify-center gap-3 cursor-pointer"
              >
                Parla con un tecnico <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;