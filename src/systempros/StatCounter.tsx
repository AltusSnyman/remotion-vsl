import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';

type Props = {
  value: number;
  suffix?: string;
  startFrame?: number;
  duration?: number;
  color?: string;
  fontSize?: number;
};

export const StatCounter: React.FC<Props> = ({
  value,
  suffix = '%',
  startFrame = 0,
  duration = 25,
  color = COLORS.cyan,
  fontSize = 96,
}) => {
  const frame = useCurrentFrame();

  const localFrame = Math.max(0, frame - startFrame);

  const current = Math.round(
    interpolate(localFrame, [0, duration], [0, value], {
      extrapolateRight: 'clamp',
    })
  );

  const opacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    frame % 40,
    [0, 20, 40],
    [0.6, 1, 0.6],
  );

  return (
    <span
      style={{
        opacity,
        fontSize,
        fontWeight: 900,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color,
        textShadow: `0 0 ${40 * glowPulse}px ${color}88`,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {current}
      {suffix}
    </span>
  );
};
