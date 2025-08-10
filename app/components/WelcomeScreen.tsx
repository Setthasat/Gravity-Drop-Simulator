import { useState, useEffect } from 'react';
import StarBackground from './StarBackground';

interface WelcomeScreenProps {
    onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // set sequences
        const sequences = [
            () => setCurrentStep(1),
            () => setCurrentStep(2),
            () => setCurrentStep(3),
            () => setCurrentStep(4),
            () => onComplete(),
        ];

        // declare timeout 
        const timeouts: NodeJS.Timeout[] = [];

        // delay
        for (let i = 0; i < sequences.length; i++) {
            // 0 : 1.2 , 1 : 2.4, 2 : 3.6, 3 : 4.8, 4 : 6.0
            const timeout = setTimeout(sequences[i], (i + 1) * 1200);
            timeouts.push(timeout);
        }

        return () => {
            for (let i = 0; i < timeouts.length; i++) {
                // clear timeout
                clearTimeout(timeouts[i]);
            }
        };
    }, [onComplete]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col items-center justify-center">
            <StarBackground />
            <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
                {/* 1 */}
                <div className={`transition-all duration-1000 ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl mb-8 tracking-tight">
                        GRAVITY
                    </h1>
                </div>

                {/* 2 */}
                <div className={`transition-all duration-1000 delay-300 ${currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-8">
                        <span className="text-purple-300">DROP</span>{" "}
                        <span className="text-cyan-300">SIMULATOR</span>
                    </div>
                </div>

                {/* 3 */}
                <div className={`transition-all duration-1000 delay-600 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-lg sm:text-2xl text-purple-200 opacity-90 max-w-3xl mx-auto leading-relaxed mb-12">
                        Experience the fascinating physics of gravity across different celestial bodies in our solar system.
                        From the gentle pull of Pluto to the crushing force of the Sun.
                    </p>
                </div>

                {/* 4 */}
                <div className={`transition-all duration-1000 delay-900 ${currentStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 inline-block">
                        <div className="flex items-center justify-center text-2xl text-white font-semibold">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400 mr-4"></div>
                            Initializing Physics Engine...
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
            </div>
        </div>
    );
}