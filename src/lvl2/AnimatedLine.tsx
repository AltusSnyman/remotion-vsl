import { interpolate, useCurrentFrame } from 'remotion';

type Props = {
  d: string;
  color: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
  glow?: boolean;
};

export const AnimatedLine: React.FC<Props> = ({
  d,
  color,
  strokeWidth = 2,
  delay = 0,
  duration = 30,
  opacity = 0.6,
  glow = true,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [delay, delay + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeIn = interpolate(frame, [delay, delay + 8], [0, opacity], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={progress}
        opacity={fadeIn}
        filter={glow ? `drop-shadow(0 0 6px ${color}88)` : undefined}
      />
    </svg>
  );
};
