import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { ConductivityTester } from './components/ConductivityTester';
import { KnowledgeBase } from './components/KnowledgeBase';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.TESTER);

  return (
    <div className="min-h-screen bg-dots text-slate-800 font-sans selection:bg-fun-yellow selection:text-black pb-10">
      <NavBar currentView={currentView} setView={setCurrentView} />
      
      <main className="container mx-auto mt-6 px-2 sm:px-4">
        {currentView === ViewState.TESTER ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ConductivityTester />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <KnowledgeBase />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;