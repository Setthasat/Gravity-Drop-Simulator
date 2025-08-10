import { useStars } from '../hooks/useStars';

interface StarBackgroundProps {
    density?: number;
    opacity?: number;
}

export default function StarBackground({ density = 150, opacity = 0.3 }: StarBackgroundProps) {
    const stars = useStars(density);
    return (
        <div className="fixed inset-0 pointer-events-none" style={{ opacity }}>
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        animationDelay: `${star.animationDelay}s`,
                        animationDuration: `${star.animationDuration}s`,
                        opacity: star.opacity,
                    }}
                >
                    <div className="w-1 h-1 bg-white rounded-full" />
                </div>
            ))}
        </div>
    );
}