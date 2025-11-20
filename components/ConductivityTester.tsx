import React, { useEffect, useState, useCallback } from 'react';
import { MAKEY_MAKEY_KEYS } from '../types';

export const ConductivityTester: React.FC = () => {
  const [isConductive, setIsConductive] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const playSound = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Video game "Power Up" sound
    osc.type = 'square'; // 8-bit style
    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
    osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.1); // Slide up fast
    osc.frequency.linearRampToValueAtTime(1760, ctx.currentTime + 0.3); // Slide up super fast
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (MAKEY_MAKEY_KEYS.includes(event.key) || MAKEY_MAKEY_KEYS.includes(event.code)) {
        if (!isConductive) {
          playSound();
        }
        setIsConductive(true);
        setLastKey(event.key === ' ' ? 'SPACE' : event.key.replace('Arrow', '').toUpperCase());

        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
          setIsConductive(false);
          setLastKey(null);
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [isConductive, playSound]);

  return (
    <div className="flex flex-col items-center w-full min-h-[70vh] relative pt-8">
      
      {/* Background FX */}
      <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isConductive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-fun-yellow rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-fun-blue rounded-full blur-3xl animate-pulse delay-75"></div>
      </div>

      {/* Main Display Board */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Status Banner */}
        <div className={`mb-8 transition-all duration-300 transform ${isConductive ? 'scale-110 rotate-2' : 'scale-100'}`}>
            <div className={`px-8 py-4 rounded-full border-b-8 text-2xl sm:text-4xl font-black tracking-wider uppercase shadow-xl ${
              isConductive 
                ? 'bg-fun-green text-white border-fun-dark-green animate-bounce' 
                : 'bg-slate-200 text-slate-400 border-slate-300'
            }`}>
              {isConductive ? "⚡ IT WORKS! ⚡" : "Waiting for Signal..."}
            </div>
        </div>

        {/* Sparky the Robot Character */}
        <div className={`relative w-72 h-72 sm:w-96 sm:h-96 transition-all duration-300 ${isConductive ? 'scale-105' : 'scale-100'}`}>
          
          {/* Robot Head Container */}
          <div className={`w-full h-full bg-white rounded-[3rem] border-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-200 ${
             isConductive ? 'border-fun-yellow shadow-[0_0_0_10px_#fde047]' : 'border-slate-300 shadow-lg'
          }`}>
            
            {/* Antenna */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-slate-300 rounded-full border-4 border-slate-400 -z-10"></div>
            <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-slate-400 transition-all ${
              isConductive ? 'bg-fun-red shadow-[0_0_20px_#fb7185]' : 'bg-slate-300'
            }`}></div>

            {/* Screen Face */}
            <div className="w-48 h-32 bg-slate-800 rounded-2xl flex items-center justify-center border-4 border-slate-200 shadow-inner relative overflow-hidden">
              {isConductive ? (
                // Awake Face
                <div className="flex gap-4 animate-wiggle-fast">
                   <div className="w-8 h-12 bg-fun-yellow rounded-full shadow-[0_0_10px_#fde047]"></div>
                   <div className="w-8 h-12 bg-fun-yellow rounded-full shadow-[0_0_10px_#fde047]"></div>
                   <div className="absolute bottom-4 w-12 h-4 bg-transparent border-b-4 border-fun-yellow rounded-full"></div>
                </div>
              ) : (
                // Sleeping Face
                <div className="flex gap-4 opacity-50">
                   <div className="w-8 h-2 bg-fun-blue rounded-full"></div>
                   <div className="w-8 h-2 bg-fun-blue rounded-full"></div>
                   <div className="absolute bottom-6 w-4 h-4 bg-transparent border-r-4 border-b-4 border-fun-blue rounded-full transform rotate-45"></div>
                   {/* Zzz Animation */}
                   <div className="absolute top-2 right-2 text-white text-xs font-bold animate-float opacity-50">z</div>
                   <div className="absolute top-4 right-4 text-white text-sm font-bold animate-float opacity-80 delay-75">Z</div>
                   <div className="absolute top-6 right-6 text-white text-lg font-bold animate-float delay-150">Z</div>
                </div>
              )}
            </div>
            
            {/* Cheeks */}
            <div className={`absolute top-40 left-8 w-6 h-6 rounded-full bg-fun-red opacity-20 ${isConductive ? 'animate-pulse opacity-60' : ''}`}></div>
            <div className={`absolute top-40 right-8 w-6 h-6 rounded-full bg-fun-red opacity-20 ${isConductive ? 'animate-pulse opacity-60' : ''}`}></div>

            {/* Body Text */}
            <div className="mt-6 text-center">
               <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Model: SP4RKY</p>
               <p className={`font-bold text-sm ${isConductive ? 'text-fun-green' : 'text-slate-400'}`}>
                 Status: {isConductive ? 'CHARGED!' : 'Offline'}
               </p>
            </div>

          </div>
        </div>

        {/* Power Meter */}
        <div className="mt-8 w-64 sm:w-80 bg-white h-8 rounded-full border-4 border-slate-300 overflow-hidden shadow-inner relative">
           <div className="absolute inset-0 flex justify-between px-2 items-center z-10">
             {[...Array(10)].map((_, i) => (
               <div key={i} className="w-1 h-4 bg-slate-100/30 rounded-full"></div>
             ))}
           </div>
           <div className={`h-full bg-gradient-to-r from-fun-yellow to-fun-red transition-all duration-150 ease-out ${
             isConductive ? 'w-full' : 'w-0'
           }`}></div>
        </div>
        
        {/* Key Indicator */}
        {lastKey && (
           <div className="mt-4 bg-fun-blue text-white font-black px-4 py-2 rounded-xl border-b-4 border-fun-dark-blue animate-pop">
             Input Detected: {lastKey}
           </div>
        )}

      </div>

      {/* How to play - Comic Style */}
      <div className="mt-12 max-w-2xl w-full mx-4 bg-white p-6 rounded-[2rem] border-[6px] border-fun-purple/30 shadow-xl relative">
        <div className="absolute -top-5 left-8 bg-fun-purple text-white px-6 py-2 rounded-xl border-b-4 border-fun-dark-purple font-black transform -rotate-2 shadow-md">
          🎮 HOW TO PLAY
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
           <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-100 flex flex-col items-center text-center">
             <div className="text-4xl mb-2">✊</div>
             <p className="font-bold text-slate-600 text-sm">Hold the Earth Clip (Ground)</p>
           </div>
           <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-100 flex flex-col items-center text-center">
             <div className="text-4xl mb-2">👉</div>
             <p className="font-bold text-slate-600 text-sm">Touch the object to test</p>
           </div>
           <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-100 flex flex-col items-center text-center">
             <div className="text-4xl mb-2">🤩</div>
             <p className="font-bold text-slate-600 text-sm">Watch Sparky wake up!</p>
           </div>
        </div>
      </div>

    </div>
  );
};