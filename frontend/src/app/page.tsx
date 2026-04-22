'use client';

import { useState } from 'react';

export default function AgentBuilder() {
  const [selectedSkills, setSelectedSkills] = useState({
    weather: false,
    email: false,
  });

  const handleToggle = (skill) => {
    setSelectedSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleDeploy = async () => {
    const activeSkills = Object.keys(selectedSkills).filter(k => selectedSkills[k]);

    console.log("Deploying agent with skills:", activeSkills);

    // Placeholder for backend Express connection
    alert(`[SYSTEM INITIATED]\nAgent deployment triggered with modules: ${activeSkills.length > 0 ? activeSkills.join(', ').toUpperCase() : 'NONE'}`);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-6 selection:bg-green-900 selection:text-green-100">
      <div className="w-full max-w-2xl border border-green-500/50 p-8 rounded-sm shadow-[0_0_20px_rgba(34,197,94,0.15)] relative overflow-hidden bg-black z-10">

        {/* Matrix Decorative element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-widest mb-2 uppercase drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
          Mini Agent Hub <span className="animate-pulse">_</span>
        </h1>
        <p className="text-xs md:text-sm text-green-700 mb-8 uppercase tracking-widest border-b border-green-900 pb-4">
          System Configuration // Select Agent Modules
        </p>

        <div className="space-y-4 mb-8">
          {/* Weather Module */}
          <label className="flex items-center space-x-4 p-4 border border-green-900 hover:border-green-500 cursor-pointer transition-all duration-300 bg-green-950/5 hover:bg-green-950/20 group">
            <div className="relative flex items-center justify-center w-6 h-6 border border-green-600 bg-black shrink-0">
              <input 
                type="checkbox" 
                className="opacity-0 absolute w-full h-full cursor-pointer z-10"
                checked={selectedSkills.weather} 
                onChange={() => handleToggle('weather')} 
              />
              {/* Custom glowing checkbox checkmark */}
              {selectedSkills.weather && <div className="w-3 h-3 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.9)]"></div>}
            </div>
            <div>
              <span className="block font-bold text-green-400 group-hover:text-green-300 tracking-wider text-sm md:text-base">WEATHER_MODULE</span>
              <span className="text-xs text-green-600/70 block mt-1">Access real-time global meteorological data arrays.</span>
            </div>
          </label>

          {/* Email Module */}
          <label className="flex items-center space-x-4 p-4 border border-green-900 hover:border-green-500 cursor-pointer transition-all duration-300 bg-green-950/5 hover:bg-green-950/20 group">
            <div className="relative flex items-center justify-center w-6 h-6 border border-green-600 bg-black shrink-0">
              <input 
                type="checkbox" 
                className="opacity-0 absolute w-full h-full cursor-pointer z-10"
                checked={selectedSkills.email} 
                onChange={() => handleToggle('email')} 
              />
              {selectedSkills.email && <div className="w-3 h-3 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.9)]"></div>}
            </div>
            <div>
              <span className="block font-bold text-green-400 group-hover:text-green-300 tracking-wider text-sm md:text-base">COMMS_PROTOCOL_EMAIL</span>
              <span className="text-xs text-green-600/70 block mt-1">Establish external SMTP transmission links for outgoing messages.</span>
            </div>
          </label>
        </div>

        <button 
          onClick={handleDeploy} 
          className="w-full py-4 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] focus:outline-none"
        >
          Initialize Agent
        </button>

        <div className="mt-6 text-[10px] md:text-xs text-green-800 text-center uppercase tracking-widest">
          System Status: <span className="text-green-500 animate-pulse ml-2">Awaiting Input...</span>
        </div>
      </div>
    </div>
  );
}