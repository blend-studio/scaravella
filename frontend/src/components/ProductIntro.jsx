import React from 'react';
import { Settings, MousePointer2, TrendingUp } from 'lucide-react';
import { Reveal, SlideIn } from './Reveal'; // <--- Importa i nostri componenti custom
import { motion } from 'framer-motion';

const ProductIntro = () => {
  return (
    <section id="prodotto" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Colonna Testo - Entra da Sinistra */}
          <div className="md:w-1/2">
            <SlideIn direction="left">
                <h4 className="text-brand-600 font-bold uppercase tracking-widest mb-2 text-sm">Tecnologia del Movimento</h4>
                <h2 className="text-3xl md:text-4xl font-black text-brand-900 uppercase mb-6 leading-tight">
                Efficienza meccanica <br/>oltre il 90%
                </h2>
                <div className="w-20 h-1 bg-brand-accent mb-8"></div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Le <strong>viti a ricircolo di sfere Scaravella</strong> rappresentano lo stato dell'arte nella trasmissione del moto. A differenza delle tradizionali viti trapezie, il moto avviene per rotolamento di sfere in acciaio rettificato tra l'albero filettato e la madrevite.
                </p>
            </SlideIn>

            <Reveal delay={0.4}>
                <ul className="space-y-4 font-medium text-brand-900">
                {[
                    { icon: Settings, text: "Gioco assiale ridotto o nullo (Precarico)" },
                    { icon: TrendingUp, text: "Alta rigidità statica e dinamica" },
                    { icon: MousePointer2, text: "Ripetibilità di posizionamento" }
                ].map((item, index) => (
                    <motion.li 
                        key={index}
                        whileHover={{ x: 10, color: "#2563eb" }} // Piccolo movimento hover
                        className="flex items-center gap-3 cursor-default"
                    >
                        <item.icon className="text-brand-accent" /> {item.text}
                    </motion.li>
                ))}
                </ul>
            </Reveal>
          </div>

          {/* Colonna Visiva - Entra da Destra */}
          <div className="md:w-1/2 relative group">
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
  );
};

export default ProductIntro;