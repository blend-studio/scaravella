import React from 'react';

const VideoSection = () => {
  return (
    <section className="py-24 bg-brand-900 text-white border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Intestazione Sezione */}
        <div className="mb-12">
          <h4 className="text-brand-accent font-bold uppercase tracking-widest mb-2 text-sm">Corporate</h4>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
            La Nostra Realtà Produttiva
          </h2>
          <div className="w-16 h-1 bg-white mx-auto mt-6"></div>
        </div>

        {/* Wrapper Video */}
        <div className="max-w-4xl mx-auto bg-black shadow-2xl border-4 border-brand-800 rounded-none relative">
            {/* Codice Embed Vimeo Fornito */}
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                <iframe 
                    src="https://player.vimeo.com/video/1154989961?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                    title="Corporate Scaravella"
                ></iframe>
            </div>
        </div>
        
        <p className="mt-8 text-gray-400 text-sm max-w-2xl mx-auto">
          Un tour all'interno del nostro stabilimento per scoprire la tecnologia e la passione che mettiamo in ogni singolo pezzo.
        </p>

      </div>
    </section>
  );
};

export default VideoSection;