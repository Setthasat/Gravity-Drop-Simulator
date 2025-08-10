export interface Star {
    id: number;
    x: number;
    y: number;
    animationDelay: number;
    animationDuration: number;
    opacity: number;
  }
  
  export interface SimulationState {
    displayHeight: number;
    displayTime: number;
    velocity: number;
    isFalling: boolean;
  }
  
  export interface SimulationParams {
    planet: string;
    initialHeight: number;
    mass: number;
  }
  
  export interface GravitySimulationHook {
    simulationState: SimulationState;
    startFall: () => void;
    resetSimulation: () => void;
  }