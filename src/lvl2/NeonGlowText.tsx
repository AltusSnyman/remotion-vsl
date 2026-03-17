import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  startFrame?: number;
};

export const NeonGlowText: React.FC<Props> = ({
  text,
  fontSize = 100,
  color = COLORS.white,
  glowColor = COLORS.purple,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - startFrame);

  const scale = spring({
    frame: localFrame,
    fps,
    config: { stiffness: 120, damping: 16 },
    from: 0.4,
    to: 1,
  });

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    (frame + startFrame) % 50,
    [0, 25, 50],
    [40, 80, 40],
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        fontSize,
        fontWeight: 900,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        color,
        textAlign: 'center',
        lineHeight: 1.15,
        textShadow: `0 0 ${glowPulse}px ${glowColor}cc, 0 0 ${glowPulse * 2}px ${glowColor}44`,
      }}
    >
      {text}
    </div>
  );
};
