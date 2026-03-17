import { interpolate, useCurrentFrame } from 'remotion';

type Props = {
  percentage: number;
  color: string;
  delay?: number;
  duration?: number;
  width?: number;
  height?: number;
};

export const AnimatedBar: React.FC<Props> = ({
  percentage,
  color,
  delay = 0,
  duration = 25,
  width = 300,
  height = 10,
}) => {
  const frame = useCurrentFrame();

  const fillWidth = interpolate(frame, [delay, delay + duration], [0, percentage], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: '#0a0a1a',
        border: `1px solid ${color}33`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: `${fillWidth}%`,
          height: '100%',
          borderRadius: height / 2,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 10px ${color}66`,
          transition: 'none',
        }}
      />
    </div>
  );
};
