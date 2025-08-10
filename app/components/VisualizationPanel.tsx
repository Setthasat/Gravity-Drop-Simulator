import { useStars } from '../hooks/useStars';
import type { SimulationState } from '../types';

interface VisualizationPanelProps {
    simulationState: SimulationState;
    initialHeight: number;
}

export default function VisualizationPanel({ simulationState, initialHeight }: VisualizationPanelProps) {

    const { displayHeight } = simulationState;
    // return array of 30 stars
    const floatingStars = useStars(30);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
                <div className="relative group w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-600 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative w-full h-full bg-gradient-to-b from-slate-900/90 via-purple-900/50 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-cyan-400/50 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>

                        {/* Floating particles inside visualization */}
                        <div className="absolute inset-0">
                            {floatingStars.map((star) => (
                                <div
                                    key={star.id}
                                    className="absolute animate-pulse"
                                    style={{
                                        left: `${star.x}%`,
                                        top: `${star.y}%`,
                                        animationDelay: `${star.animationDelay}s`,
                                        animationDuration: `${star.animationDuration}s`,
                                    }}
                                >
                                    <div className="w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-70" />
                                </div>
                            ))}
                        </div>

                        {/* Height markers */}
                        <div className="absolute inset-2 sm:inset-4 pointer-events-none">
                            {Array.from({ length: 11 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute left-0 w-full border-t border-cyan-400/20"
                                    style={{ top: `${(i / 10) * 100}%` }}
                                >
                                    <span
                                        className="absolute left-1 sm:left-3 text-cyan-300/80 text-xs sm:text-sm font-mono bg-black/50 px-1 sm:px-2 py-0.5 sm:py-1 rounded"
                                        style={{
                                            top: '-10px',
                                            fontSize: 'clamp(0.6rem, 2vw, 0.75rem)'
                                        }}
                                    >
                                        {Math.round(initialHeight * (1 - i / 10))}m
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Falling object */}
                        <div
                            className="absolute rounded-full transition-all duration-75 z-10"
                            style={{
                                width: 'clamp(24px, 5vw, 36px)',
                                height: 'clamp(24px, 5vw, 36px)',
                                bottom: `${displayHeight > 0 ? (displayHeight / initialHeight) * 100 : 0}%`,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: `radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b, #d97706)`,
                                boxShadow: `
                  0 0 40px 8px rgba(251, 191, 36, 0.6),
                  0 0 80px 16px rgba(251, 191, 36, 0.3),
                  inset -8px -8px 16px rgba(0, 0, 0, 0.4),
                  inset 8px 8px 16px rgba(255, 255, 255, 0.2)
                `,
                            }}
                        >

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}