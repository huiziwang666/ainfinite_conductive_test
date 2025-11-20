import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askProfessorSparky } from '../services/geminiService';

export const ChatBot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi Science Cadet! 👋 I'm Professor Sparky. Ask me anything about electricity! What are we testing today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askProfessorSparky(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Oops! Your browser can't hear you. Try using Chrome!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="bg-fun-purple p-2 rounded-[3rem] shadow-2xl border-b-8 border-fun-dark-purple max-w-md mx-auto sm:max-w-full transform hover:scale-[1.01] transition-transform duration-300">
      
      {/* Tablet Screen Bezel */}
      <div className="bg-slate-900 p-3 rounded-[2.5rem] h-[600px] flex flex-col relative">
        
        {/* Camera Dot */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full border border-slate-700 z-10 shadow-inner"></div>

        {/* Screen Header */}
        <div className="bg-fun-blue p-3 rounded-t-[2rem] flex items-center gap-3 mt-4 border-b-4 border-blue-600">
          <div className="w-10 h-10 bg-white rounded-full border-2 border-black flex items-center justify-center text-2xl shadow-sm overflow-hidden">
            <span className="animate-bounce-slow mt-1">🤖</span>
          </div>
          <div className="flex-1">
            <h3 className="font-black text-white text-lg tracking-wide leading-tight">Sparky Chat</h3>
            <div className="flex gap-1">
               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
               <span className="text-blue-100 text-[10px] font-bold uppercase">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Area (Screen) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-hide relative">
           {/* Background pattern for chat */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
           
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
            >
              <div
                className={`max-w-[85%] p-3 sm:p-4 text-sm sm:text-base font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.1)] ${
                  msg.role === 'user'
                    ? 'bg-fun-yellow text-slate-800 rounded-2xl rounded-tr-none border-2 border-yellow-400'
                    : 'bg-fun-bg text-slate-700 rounded-2xl rounded-tl-none border-2 border-blue-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none border-2 border-slate-200 flex gap-2 items-center">
                <span className="text-xl animate-spin">⚙️</span>
                <span className="text-xs text-slate-500 font-bold">Computing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Controls */}
        <div className="bg-slate-100 p-3 rounded-b-[2rem] border-t-2 border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={startListening}
              className={`p-3 rounded-xl transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-[4px] ${
                isListening 
                  ? 'bg-fun-red text-white border-fun-dark-red animate-pulse' 
                  : 'bg-white text-slate-400 border-slate-300 hover:text-fun-blue'
              }`}
              title="Voice Input"
            >
              {isListening ? '👂' : '🎤'}
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type here..."
              className="flex-1 px-4 rounded-xl bg-white border-2 border-slate-300 text-slate-700 placeholder-slate-400 focus:border-fun-blue focus:outline-none focus:ring-2 focus:ring-fun-blue/20 font-bold text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-fun-blue hover:bg-blue-400 text-white px-4 rounded-xl transition-all disabled:opacity-50 font-black uppercase text-xs shadow-sm border-b-4 border-blue-600 active:border-b-0 active:translate-y-[4px]"
            >
              SEND
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};