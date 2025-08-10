import { useState, useEffect, useRef } from 'react';
import { planetsGravity } from '../data/constants';
import type { SimulationState, SimulationParams, GravitySimulationHook } from '../types';

export const useGravitySimulation = (params: SimulationParams): GravitySimulationHook => {

    // destructuring params (obj)
    const { planet, initialHeight, mass } = params;

    const [simulationState, setSimulationState] = useState<SimulationState>({
        displayHeight: initialHeight,
        displayTime: 0,
        velocity: 0,
        isFalling: false,
    });

    // useRef for no render
    const heightRef = useRef(initialHeight); //current height
    const timeRef = useRef(0); //time
    const velocityRef = useRef(0); //speed 
    const animationRef = useRef<number | null>(null); //animation id
    const intervalRef = useRef<NodeJS.Timeout | null>(null); //interval id

    //reset animation
    const resetSimulation = () => {

        // clear animation
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        // clear interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // set to default
        heightRef.current = initialHeight;
        timeRef.current = 0;
        velocityRef.current = 0;

        setSimulationState({
            displayHeight: initialHeight,
            displayTime: 0,
            velocity: 0,
            isFalling: false,
        });
    };

    // drop animation
    const startFall = () => {

        // prevent double animation
        if (simulationState.isFalling) return;
        // start  
        setSimulationState(prev => ({ ...prev, isFalling: true }));
        // set start time 
        let startTime: number | null = null;

        const g = planetsGravity[planet];
        const massEffect = 1 + (mass - 1) * 0.02;
        const effectiveG = g * massEffect;

        function animate(timestamp: number) {
            if (!startTime) startTime = timestamp; // record start time
            const elapsed = (timestamp - startTime) / 1000; // time pass / 1 sec

            // s = 1/2 gt² 
            const newHeight = initialHeight - 0.5 * effectiveG * elapsed * elapsed;
            // v = gt
            const newVelocity = effectiveG * elapsed;

            // check not touch ground
            if (newHeight > 0) {

                //update height, time, velocity (final display data)
                heightRef.current = newHeight;
                timeRef.current = elapsed;
                velocityRef.current = newVelocity;

                //call animate next frames
                animationRef.current = requestAnimationFrame(animate);
            } else {
                // on ground

                //reset height, time, velocity
                heightRef.current = 0;
                timeRef.current = elapsed;
                velocityRef.current = newVelocity;

                //reset height, time, velocity
                setSimulationState({
                    displayHeight: 0,
                    displayTime: elapsed,
                    velocity: newVelocity,
                    isFalling: false,
                });

                //stop animation
                animationRef.current = null;

                // clear interval
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }
        }

        // loop animation 
        animationRef.current = requestAnimationFrame(animate);

        // set interval (update ui every 16ms (~60FPS))
        intervalRef.current = setInterval(() => {
            setSimulationState({
                // update falling display data update every 16ms
                displayHeight: heightRef.current,
                displayTime: timeRef.current,
                velocity: velocityRef.current,
                isFalling: true,
            });
        }, 16);
    };

    //reset when parameter change
    useEffect(() => {
        resetSimulation();
    }, [initialHeight, planet, mass]);

    return {
        simulationState,
        startFall,
        resetSimulation,
    };
};