import { interpolate, useCurrentFrame } from 'remotion';

type Props = {
  data?: number[];
  color: string;
  delay?: number;
  duration?: number;
  width?: number;
  height?: number;
  direction?: 'up' | 'down';
  showFill?: boolean;
  style?: React.CSSProperties;
};

const UP_DATA = [0.15, 0.2, 0.18, 0.3, 0.35, 0.5, 0.55, 0.7, 0.75, 0.85, 0.92];
const DOWN_DATA = [0.9, 0.85, 0.82, 0.7, 0.6, 0.55, 0.4, 0.35, 0.2, 0.15, 0.1];

export const AnimatedGraph: React.FC<Props> = ({
  data,
  color,
  delay = 0,
  duration = 40,
  width = 300,
  height = 150,
  direction,
  showFill = true,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const points = data || (direction === 'down' ? DOWN_DATA : UP_DATA);

  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeIn = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const padding = 10;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const coords = points.map((v, i) => ({
    x: padding + (i / (points.length - 1)) * innerW,
    y: padding + (1 - v) * innerH,
  }));

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const fillPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  const clipWidth = progress * width;

  return (
    <div style={{ opacity: fadeIn, position: 'relative', ...style }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <clipPath id={`graph-clip-${delay}`}>
            <rect x={0} y={0} width={clipWidth} height={height} />
          </clipPath>
          <linearGradient id={`graph-fill-${delay}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <g clipPath={`url(#graph-clip-${delay})`}>
          {showFill && (
            <path d={fillPath} fill={`url(#graph-fill-${delay})`} />
          )}
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`drop-shadow(0 0 4px ${color}66)`}
          />
        </g>
      </svg>
    </div>
  );
};
