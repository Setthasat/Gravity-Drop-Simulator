import { useRef } from 'react';
import type { Star } from '../types';

//set start star to 150
export const useStars = (count: number = 150) => {

    //array of start obj
    const starsRef = useRef<Star[] | null>(null);
    // now count 
    const countRef = useRef<number>(count);

    if (!starsRef.current || countRef.current !== count) {
        // random start 
        starsRef.current = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            animationDelay: Math.random() * 5,
            animationDuration: 2 + Math.random() * 3,
            opacity: 0.3 + Math.random() * 0.3,
        }));
        // update round
        countRef.current = count;
    }

    return starsRef.current;
};