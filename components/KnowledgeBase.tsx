import React from 'react';
import { ChatBot } from './ChatBot';

export const KnowledgeBase: React.FC = () => {
  const conductiveItems = [
    { name: 'Metals', icon: '🥄', desc: 'Spoons, Keys', stars: 3 },
    { name: 'Water', icon: '💧', desc: 'Tap water, Puddles', stars: 2 },
    { name: 'You!', icon: '🧍', desc: 'Your skin works!', stars: 2 },
    { name: 'Foil', icon: '🛡️', desc: 'Shiny wrappers', stars: 3 },
    { name: 'Fruit', icon: '🍋', desc: 'Sour lemons', stars: 1 },
    { name: 'Graphite', icon: '✏️', desc: 'Pencil lead', stars: 1 },
    { name: 'Coins', icon: '🪙', desc: 'Money is metal!', stars: 3 },
    { name: 'Play-Doh', icon: '🐌', desc: 'Salty clay', stars: 2 },
    { name: 'Paper Clip', icon: '📎', desc: 'Bendable metal', stars: 3 },
    { name: 'Soda Can', icon: '🥫', desc: 'Aluminum', stars: 3 },
  ];

  const insulatorItems = [
    { name: 'Rubber', icon: '👟', desc: 'Shoe soles' },
    { name: 'Wood', icon: '🪵', desc: 'Sticks & Twigs' },
    { name: 'Glass', icon: '🪟', desc: 'Windows, Jars' },
    { name: 'Plastic', icon: '🧱', desc: 'Toy bricks' },
    { name: 'Paper', icon: '📄', desc: 'Books & Cardboard' },
    { name: 'Cotton', icon: '👕', desc: 'T-Shirts & Fabric' },
    { name: 'Balloon', icon: '🎈', desc: 'Stretchy rubber' },
    { name: 'Eraser', icon: '🧼', desc: 'Rubbery stuff' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header Banner */}
      <div className="bg-white rounded-[2rem] p-8 border-[6px] border-fun-blue shadow-xl mb-8 text-center relative overflow-hidden">
         <div className="bg-dots absolute inset-0 opacity-50"></div>
         <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black text-fun-blue mb-2 drop-shadow-sm uppercase tracking-tighter">
              Science Manual
            </h2>
            <p className="font-bold text-slate-400">Collect them all in your brain! 🧠</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: The Cards */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Conductors Section */}
          <div>
            <div className="flex items-center gap-3 mb-4 pl-2">
                <span className="text-3xl">⚡</span>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-slate-700 uppercase italic leading-none">Energy Bridges</h3>
                  <span className="text-sm font-bold text-fun-green uppercase tracking-widest">Conductive</span>
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {conductiveItems.map((item) => (
                <div key={item.name} className="group bg-white rounded-2xl border-4 border-fun-yellow p-3 flex flex-col items-center text-center shadow-md hover:scale-105 hover:-rotate-2 transition-transform cursor-pointer relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2 bg-fun-yellow"></div>
                   <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 mt-2">{item.icon}</div>
                   <div className="font-black text-slate-800 text-lg leading-none">{item.name}</div>
                   <div className="text-xs text-slate-500 font-bold mt-1">{item.desc}</div>
                   <div className="mt-2 flex gap-1 text-[10px]">
                     {[...Array(3)].map((_, i) => (
                       <span key={i} className={i < item.stars ? 'grayscale-0' : 'grayscale opacity-20'}>⭐</span>
                     ))}
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insulators Section */}
          <div>
            <div className="flex items-center gap-3 mb-4 pl-2">
                <span className="text-3xl">🛑</span>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-slate-700 uppercase italic leading-none">Energy Walls</h3>
                  <span className="text-sm font-bold text-fun-red uppercase tracking-widest">Insulators</span>
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {insulatorItems.map((item) => (
                <div key={item.name} className="group bg-white rounded-2xl border-4 border-slate-200 p-3 flex flex-col items-center text-center shadow-sm hover:scale-105 hover:rotate-2 transition-transform cursor-pointer opacity-80 hover:opacity-100">
                   <div className="text-4xl mb-2 grayscale group-hover:grayscale-0 transition-all mt-2">{item.icon}</div>
                   <div className="font-black text-slate-500 group-hover:text-slate-800 text-lg leading-none">{item.name}</div>
                   <div className="text-xs text-slate-400 font-bold mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: The Chatbot */}
        <div className="lg:col-span-5">
             <div className="sticky top-28">
                <div className="text-center mb-4">
                  <span className="bg-fun-purple text-white px-4 py-1 rounded-full font-black text-sm uppercase shadow-md border-2 border-white">
                    Need Help?
                  </span>
                </div>
                <ChatBot />
             </div>
        </div>
      </div>
    </div>
  );
};