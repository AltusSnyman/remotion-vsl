import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = {
  src: string;
  label: string;
  color: string;
  delay?: number;
  size?: number;
};

export const ChannelIcon: React.FC<Props> = ({
  src,
  label,
  color,
  delay = 0,
  size = 160,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: localFrame,
    fps,
    config: { stiffness: 160, damping: 14 },
    from: 0,
    to: 1,
  });

  const opacity = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    (frame + delay * 3) % 50,
    [0, 25, 50],
    [0.5, 1, 0.5],
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 28,
          overflow: 'hidden',
          border: `2px solid ${color}88`,
          boxShadow: `0 0 ${30 * glowPulse}px ${color}66, inset 0 0 20px ${color}22`,
          backgroundColor: '#0a0a1a',
        }}
      >
        <Img
          src={staticFile(src)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          color,
          fontFamily: 'system-ui, sans-serif',
          textShadow: `0 0 10px ${color}66`,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
};
