"use client";
import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import Header from "./components/Header";
import PlanetSelector from "./components/PlanetSelector";
import ParametersPanel from "./components/ParametersPanel";
import VisualizationPanel from "./components/VisualizationPanel";
import TelemetryPanel from "./components/TelemetryPanel";
import ActionButton from "./components/ActionButton";
import StarBackground from "./components/StarBackground";
import { useGravitySimulation } from "./hooks/useGravitySimulation";
import { planetColors } from "./data/constants";
import "./styles/animations.css";

export default function Home() {

  // set default
  const [showWelcome, setShowWelcome] = useState(true);
  const [planet, setPlanet] = useState("Earth");
  const [initialHeight, setInitialHeight] = useState(100);
  const [mass, setMass] = useState(1);


  const { simulationState, startFall } = useGravitySimulation({
    planet,
    initialHeight,
    mass,
  });

  const currentPlanetColor = planetColors[planet];

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden animate-fade-in">
      <StarBackground />
      {/* create stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* make 20 idex array */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentPlanetColor}`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        {/* Main Content */}
        <div className="flex-1 p-2 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto h-full">
            {/* Mobile */}
            <div className="xl:hidden space-y-3">
              <div className="animate-slide-in-left">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                    {/* Controls Header */}
                    <div className="mb-4">
                      <h1 className="text-lg sm:text-xl font-bold text-white mb-2">Mission Controls</h1>
                      <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
                    </div>
                    {/* Controls Content - Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Planet Selection */}
                      <div className="sm:col-span-2">
                        <PlanetSelector
                          planet={planet}
                          onPlanetChange={setPlanet}
                          disabled={simulationState.isFalling}
                        />
                      </div>
                      {/* Parameters */}
                      <div className="sm:col-span-2">
                        <ParametersPanel
                          initialHeight={initialHeight}
                          mass={mass}
                          onHeightChange={setInitialHeight}
                          onMassChange={setMass}
                          disabled={simulationState.isFalling}
                        />
                      </div>
                    </div>
                    {/* Action Button */}
                    <ActionButton
                      onStartFall={startFall}
                      isFalling={simulationState.isFalling}
                    />
                  </div>
                </div>
              </div>

              {/* Visualization Panel - Mobile */}
              <div className="animate-scale-in">
                <div className="h-64 sm:h-80 md:h-96 lg:h-[500px]">
                  <VisualizationPanel
                    simulationState={simulationState}
                    initialHeight={initialHeight}
                  />
                </div>
              </div>
              {/* Telemetry Panel - Mobile */}
              <div className="animate-slide-in-right">
                <TelemetryPanel
                  simulationState={simulationState}
                  planet={planet}
                  mass={mass}
                />
              </div>
            </div>
            {/* Desktop Layout (xl and up) */}
            <div className="hidden xl:block min-h-screen">
              <div className="grid grid-rows-[55%_45%] gap-4 min-h-[calc(100vh-80px)] py-2">
                {/* Top Row - Controls and Visualization */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 min-h-0 overflow-hidden">
                  {/* Controls Panel */}
                  <div className="xl:col-span-2 animate-slide-in-left">
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 h-full flex flex-col">
                        {/* Controls Header */}
                        <div className="mb-6">
                          <h1 className="text-2xl font-bold text-white mb-2">Mission Controls</h1>
                          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
                        </div>
                        {/* Planet Selection */}
                        <div className="mb-6">
                          <PlanetSelector
                            planet={planet}
                            onPlanetChange={setPlanet}
                            disabled={simulationState.isFalling}
                          />
                        </div>
                        {/* Divider */}
                        <div className="border-t border-white/10 my-4"></div>
                        {/* Parameters */}
                        <div className="mb-6 flex-grow">
                          <ParametersPanel
                            initialHeight={initialHeight}
                            mass={mass}
                            onHeightChange={setInitialHeight}
                            onMassChange={setMass}
                            disabled={simulationState.isFalling}
                          />
                        </div>
                        {/* Action Button at Bottom */}
                        <div className="mt-auto">
                          <ActionButton
                            onStartFall={startFall}
                            isFalling={simulationState.isFalling}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Visualization Panel */}
                  <div className="xl:col-span-3 animate-scale-in">
                    <div className="h-full">
                      <VisualizationPanel
                        simulationState={simulationState}
                        initialHeight={initialHeight}
                      />
                    </div>
                  </div>
                </div>
                {/* Bottom Row - Telemetry Panel */}
                <div className="animate-slide-in-right">
                  <div className="h-full w-full">
                    <TelemetryPanel
                      simulationState={simulationState}
                      planet={planet}
                      mass={mass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}