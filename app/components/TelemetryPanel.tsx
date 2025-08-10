import { planetsGravity, planetColors } from '../data/constants';
import type { SimulationState } from '../types';

interface TelemetryPanelProps {
  simulationState: SimulationState;
  planet: string;
  mass: number;
}

export default function TelemetryPanel({ simulationState, planet, mass }: TelemetryPanelProps) {
  const { displayHeight, displayTime, velocity } = simulationState;
  const currentPlanetColor = planetColors[planet];

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
      <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 h-full">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          Live Telemetry
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-4 border border-cyan-500/30">
            <div className="flex justify-between items-center">
              <span className="text-cyan-300 font-medium text-sm">TIME ELAPSED</span>
              <span className="text-white text-xl font-bold tabular-nums">{displayTime.toFixed(2)}s</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 border border-green-500/30">
            <div className="flex justify-between items-center">
              <span className="text-green-300 font-medium text-sm">ALTITUDE</span>
              <span className="text-white text-xl font-bold tabular-nums">{displayHeight.toFixed(1)}m</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-purple-500/30">
            <div className="flex justify-between items-center">
              <span className="text-purple-300 font-medium text-sm">VELOCITY</span>
              <span className="text-white text-xl font-bold tabular-nums">{velocity.toFixed(1)} m/s</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-4 border border-yellow-500/30">
            <div className="flex justify-between items-center">
              <span className="text-yellow-300 font-medium text-sm">MASS</span>
              <span className="text-white text-xl font-bold tabular-nums">{mass.toFixed(1)}kg</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-2xl p-4 border border-red-500/30">
            <div className="flex justify-between items-center">
              <span className="text-red-300 font-medium text-sm">GRAVITY</span>
              <span className="text-white text-xl font-bold tabular-nums">{planetsGravity[planet]} m/s²</span>
            </div>
          </div>

          {/* Planet Info */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-4 border border-indigo-500/30 mt-6">
            <div className="text-center">
              <div className="text-indigo-300 font-medium text-sm mb-2">CURRENT WORLD</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${currentPlanetColor} bg-clip-text text-transparent`}>
                {planet}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}