import React from 'react';
import { ViewState } from '../types';

interface NavBarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, setView }) => {
  return (
    <nav className="p-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] border-[6px] border-slate-200 shadow-xl p-3 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Logo Area */}
        <div className="flex items-center gap-4 group cursor-default">
          <div className="bg-white p-2 rounded-2xl border-4 border-slate-200 active:border-b-0 active:translate-y-2 transition-all transform hover:scale-105 shadow-md">
            <img src="/new-logo.png" alt="AInfinite Logo" className="w-12 h-12 object-contain" />
          </div>
          <div className="flex flex-col">
             <h1 className="text-3xl font-black text-fun-blue tracking-tight leading-none" style={{ textShadow: '2px 2px 0px #00000010' }}>
              AInfinite's Lab
            </h1>
            <div className="flex gap-2 mt-1">
              <span className="text-[10px] font-black text-white uppercase bg-fun-red px-2 py-1 rounded-lg transform -rotate-2 shadow-sm">
                Science Fun
              </span>
              <span className="text-[10px] font-black text-white uppercase bg-fun-green px-2 py-1 rounded-lg transform rotate-2 shadow-sm">
                v3.0
              </span>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-3 bg-fun-bg p-2 rounded-[1.5rem] border-2 border-slate-100">
          <button
            onClick={() => setView(ViewState.TESTER)}
            className={`px-6 py-3 rounded-2xl font-black uppercase tracking-wide text-sm transition-all duration-200 border-b-[6px] active:border-b-0 active:translate-y-[6px] ${
              currentView === ViewState.TESTER
                ? 'bg-fun-blue text-white border-fun-dark-blue shadow-lg transform -rotate-1'
                : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
            }`}
          >
            ⚡ Test It!
          </button>
          <button
            onClick={() => setView(ViewState.KNOWLEDGE)}
            className={`px-6 py-3 rounded-2xl font-black uppercase tracking-wide text-sm transition-all duration-200 border-b-[6px] active:border-b-0 active:translate-y-[6px] ${
              currentView === ViewState.KNOWLEDGE
                ? 'bg-fun-purple text-white border-fun-dark-purple shadow-lg transform rotate-1'
                : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
            }`}
          >
            📚 Learn It!
          </button>
        </div>
      </div>
    </nav>
  );
};