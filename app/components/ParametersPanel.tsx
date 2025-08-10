interface ParametersPanelProps {
  initialHeight: number;
  mass: number;
  onHeightChange: (height: number) => void;
  onMassChange: (mass: number) => void;
  disabled: boolean;
}

export default function ParametersPanel({ initialHeight, mass, onHeightChange, onMassChange, disabled }: ParametersPanelProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Parameters</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-cyan-300 font-semibold mb-2">
            Initial Height
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="1000"
              value={initialHeight}
              onChange={(e) => onHeightChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full bg-white/10 backdrop-blur border border-white/30 text-white rounded-2xl py-3 px-4 pr-12 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300 disabled:opacity-50"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 font-medium text-sm">m</span>
          </div>
        </div>

        <div>
          <label className="block text-pink-300 font-semibold mb-2">
            Object Mass
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.1"
              max="1000"
              step="0.1"
              value={mass}
              onChange={(e) => onMassChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full bg-white/10 backdrop-blur border border-white/30 text-white rounded-2xl py-3 px-4 pr-12 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-pink-400 transition-all duration-300 disabled:opacity-50"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-300 font-medium text-sm">kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}