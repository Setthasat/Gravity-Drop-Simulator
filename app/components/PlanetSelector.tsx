import { useState } from 'react';
import { planetsGravity, planetColors } from '../data/constants';

interface PlanetSelectorProps {
  planet: string;
  onPlanetChange: (planet: string) => void;
  disabled: boolean;
}

export default function PlanetSelector({ planet, onPlanetChange, disabled }: PlanetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPlanetColor = planetColors[planet];

  const planets = Object.keys(planetsGravity);

  const handlePlanetSelect = (selectedPlanet: string) => {
    onPlanetChange(selectedPlanet);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${currentPlanetColor} mr-3 animate-pulse`}></div>
        <h2 className="text-xl font-bold text-white">Celestial Body</h2>
      </div>
      
      <div className="relative mb-4">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full bg-white/10 backdrop-blur border border-white/30 text-white rounded-2xl py-4 px-6 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 disabled:opacity-50 text-left flex items-center justify-between"
        >
          <span>{planet} • {planetsGravity[planet]} m/s²</span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800/95 backdrop-blur border border-white/30 rounded-2xl py-2 z-50 shadow-2xl max-h-72 overflow-y-auto">
            {planets.map((p) => (
              <button
                key={p}
                onClick={() => handlePlanetSelect(p)}
                className={`w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors duration-200 flex items-center justify-between ${
                  p === planet ? 'bg-white/5' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${planetColors[p]} mr-3`}></div>
                  <span className="font-medium">{p}</span>
                </div>
                <span className="text-sm text-gray-300">{planetsGravity[p]} m/s²</span>
              </button>
            ))}
          </div>
        )}
        
        {/* Overlay to close dropdown when clicking outside */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-purple-300 font-medium">Gravity</div>
          <div className="text-white text-lg font-bold">{planetsGravity[planet]} m/s²</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-cyan-300 font-medium">Type</div>
          <div className="text-white text-lg font-bold">
            {planet === 'Sun' ? 'Star' : planet === 'Moon' ? 'Satellite' : 'Planet'}
          </div>
        </div>
      </div>
    </div>
  );
}