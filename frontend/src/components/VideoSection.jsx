import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';
import Player from '@vimeo/player';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const VideoSection = () => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const { t } = useTranslation();

  // Stati Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Helper formattazione tempo
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    // Inizializzazione Dati Base
    Promise.all([
      player.getDuration(),
      player.getVolume()
    ]).then(([d, v]) => {
      setDuration(d);
      setVolume(v);
    });

    // Event Listeners
    player.on('play', () => setIsPlaying(true));
    player.on('pause', () => setIsPlaying(false));
    player.on('timeupdate', (data) => {
      setProgress(data.percent * 100);
      setCurrentTime(data.seconds);
    });

    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      player.off('play');
      player.off('pause');
      player.off('timeupdate');
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // --- HANDLERS ---
  const togglePlay = () => isPlaying ? playerRef.current.pause() : playerRef.current.play();
  
  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    const newTime = (val / 100) * duration;
    playerRef.current.setCurrentTime(newTime);
    setProgress(val);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    playerRef.current.setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      const newVol = volume || 1;
      playerRef.current.setVolume(newVol);
      setVolume(newVol);
      setIsMuted(false);
    } else {
      playerRef.current.setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section className="py-12 md:py-24 bg-brand-900 text-white border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <Reveal width="100%">
            <div className="mb-12">
            <h4 className="text-brand-accent font-bold uppercase tracking-widest mb-2 text-sm">{t.video.label}</h4>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
                {t.video.title}
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mt-6"></div>
            </div>
        </Reveal>

        <Reveal width="100%" delay={0.4}>
            <div 
              ref={containerRef}
              className={`max-w-5xl mx-auto bg-black shadow-2xl border border-brand-800 relative group overflow-hidden ${isFullscreen ? 'flex items-center justify-center w-full h-full border-none' : ''}`}
            >
                {/* VIDEO CONTAINER */}
                <div style={{ 
                    padding: isFullscreen ? '0' : '56.25% 0 0 0', 
                    width: '100%',
                    height: isFullscreen ? '100%' : 'auto',
                    position: 'relative' 
                }}>
                    <iframe 
                        ref={iframeRef}
                        src="https://player.vimeo.com/video/1154989961?badge=0&autopause=0&player_id=0&app_id=58479&controls=0&title=0&byline=0&portrait=0" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                        className="absolute top-0 left-0 w-full h-full pointer-events-none md:pointer-events-auto"
                        title="Corporate Scaravella"
                    ></iframe>
                    <div onClick={togglePlay} className="absolute inset-0 z-10 cursor-pointer bg-transparent"></div>
                </div>

                {/* --- CONTROL BAR --- */}
                <div className="absolute bottom-0 left-0 right-0 bg-brand-900/90 backdrop-blur-md p-3 md:p-4 flex items-center gap-4 z-20 border-t border-brand-800 transition-transform duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    
                    {/* Play/Pause */}
                    <button onClick={togglePlay} className="text-brand-accent hover:text-white transition-colors focus:outline-none flex-shrink-0">
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>

                    {/* Time */}
                    <div className="text-xs font-mono text-gray-300 min-w-[80px] text-center flex-shrink-0 select-none hidden sm:block">
                       <span className="text-white">{formatTime(currentTime)}</span> / {formatTime(duration)}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-grow">
                         <input 
                            type="range" min="0" max="100" value={progress} onChange={handleSeek}
                            className="w-full h-2 bg-brand-800 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-brand-accent [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                        />
                    </div>

                    {/* Volume Controls */}
                    <div className="flex items-center gap-2 group/vol border-l border-brand-800 pl-4 flex-shrink-0">
                        <button onClick={toggleMute} className="text-gray-300 hover:text-white focus:outline-none">
                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input 
                            type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange}
                            className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                        />
                    </div>

                    {/* Fullscreen */}
                    <button onClick={toggleFullscreen} className="text-gray-300 hover:text-white transition-colors focus:outline-none border-l border-brand-800 pl-4 flex-shrink-0">
                        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                    </button>
                </div>

                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                        <div className="bg-brand-accent/90 p-6 rounded-full shadow-lg transform transition-transform scale-100 animate-pulse">
                            <Play size={48} className="text-brand-900 ml-1" fill="currentColor" />
                        </div>
                    </div>
                )}
            </div>
        </Reveal>
        
        <p className="mt-8 text-gray-400 text-base md:text-lg max-w-3xl mx-auto">{t.video.desc}</p>
      </div>
    </section>
  );
};

export default VideoSection;