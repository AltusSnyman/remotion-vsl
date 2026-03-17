import { random, useCurrentFrame } from 'remotion';

type Props = {
  particleCount?: number;
  color?: string;
  connectionDistance?: number;
  speed?: number;
  opacity?: number;
  seed?: string;
};

export const ParticleField: React.FC<Props> = ({
  particleCount = 40,
  color = '#10B981',
  connectionDistance = 150,
  speed = 1,
  opacity = 0.4,
  seed = 'particles',
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const ix = random(`${seed}-x-${i}`) * 1920;
    const iy = random(`${seed}-y-${i}`) * 1080;
    const vx = (random(`${seed}-vx-${i}`) - 0.5) * 0.8;
    const vy = (random(`${seed}-vy-${i}`) - 0.5) * 0.6;
    const x = ((ix + vx * frame * speed) % 1920 + 1920) % 1920;
    const y = ((iy + vy * frame * speed) % 1080 + 1080) % 1080;
    return { x, y };
  });

  const connections: Array<{ x1: number; y1: number; x2: number; y2: number; dist: number }> = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionDistance) {
        connections.push({ x1: particles[i].x, y1: particles[i].y, x2: particles[j].x, y2: particles[j].y, dist });
      }
    }
  }

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {connections.map((c, i) => (
        <line
          key={`l-${i}`}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke={color}
          strokeWidth={0.8}
          opacity={opacity * (1 - c.dist / connectionDistance) * 0.5}
        />
      ))}
      {particles.map((p, i) => (
        <circle
          key={`p-${i}`}
          cx={p.x}
          cy={p.y}
          r={2}
          fill={color}
          opacity={opacity * 0.8}
        />
      ))}
    </svg>
  );
};
