import { interpolate, useCurrentFrame } from 'remotion';

type Props = {
  x: number;
  y: number;
  color: string;
  delay?: number;
  ringCount?: number;
  ringInterval?: number;
  maxRadius?: number;
  duration?: number;
};

export const PulseRing: React.FC<Props> = ({
  x,
  y,
  color,
  delay = 0,
  ringCount = 3,
  ringInterval = 15,
  maxRadius = 200,
  duration = 45,
}) => {
  const frame = useCurrentFrame();

  const rings = Array.from({ length: ringCount }, (_, i) => {
    const ringStart = delay + i * ringInterval;
    const localFrame = frame - ringStart;

    if (localFrame < 0 || localFrame > duration) return null;

    const radius = interpolate(localFrame, [0, duration], [0, maxRadius], {
      extrapolateRight: 'clamp',
    });

    const opacity = interpolate(localFrame, [0, 5, duration], [0, 0.6, 0], {
      extrapolateRight: 'clamp',
    });

    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        opacity={opacity}
        filter={`drop-shadow(0 0 4px ${color}66)`}
      />
    );
  });

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {rings}
    </svg>
  );
};
