import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';

type Props = {
  text: string;
  startFrame?: number;
  wordDelay?: number;
  fontSize?: number;
  color?: string;
  highlight?: string[];
  highlightColor?: string;
  style?: React.CSSProperties;
};

export const WordReveal: React.FC<Props> = ({
  text,
  startFrame = 0,
  wordDelay = 6,
  fontSize = 80,
  color = COLORS.white,
  highlight = [],
  highlightColor = COLORS.cyan,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.3em',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        fontSize,
        fontWeight: 800,
        color,
        textAlign: 'center',
        lineHeight: 1.2,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * wordDelay;
        const localFrame = Math.max(0, frame - wordStart);

        const scale = spring({
          frame: localFrame,
          fps,
          config: { stiffness: 200, damping: 18 },
          from: 0.6,
          to: 1,
          durationInFrames: 20,
        });

        const opacity = interpolate(localFrame, [0, 8], [0, 1], {
          extrapolateRight: 'clamp',
        });

        const isHighlighted = highlight.includes(word.replace(/[^a-zA-Z0-9$%,]/g, ''));

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform: `scale(${scale})`,
              color: isHighlighted ? highlightColor : color,
              textShadow: isHighlighted
                ? `0 0 30px ${highlightColor}88`
                : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
