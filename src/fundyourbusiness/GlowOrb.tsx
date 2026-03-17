import { interpolate, useCurrentFrame } from 'remotion';

type Props = {
  color: string;
  x: number;
  y: number;
  size: number;
  speed?: number;
};

export const GlowOrb: React.FC<Props> = ({
  color,
  x,
  y,
  size,
  speed = 0.3,
}) => {
  const frame = useCurrentFrame();

  const drift = Math.sin(frame * speed * 0.02) * 20;
  const pulse = interpolate(
    frame % Math.round(80 / speed),
    [0, Math.round(40 / speed), Math.round(80 / speed)],
    [0.3, 0.6, 0.3],
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}${Math.round(pulse * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        transform: `translate(-50%, -50%) translateY(${drift}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};
