// Scene 2: 0-90f (3s) — "If you're a GoHighLevel Agency Owner"
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from './constants';
import { WordReveal } from './WordReveal';

export const Scene2Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [160, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.4 }}>
        <Img
          src={staticFile('opener/bg-texture.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Subtle top label */}
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }) * fadeOut,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 60,
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 6,
            color: COLORS.ghlPurpleLight,
            fontFamily: 'system-ui, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          GoHighLevel Agency Owners
        </span>
      </AbsoluteFill>

      {/* Main headline */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeOut,
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        <WordReveal
          text="If you are a GoHighLevel Agency Owner"
          startFrame={5}
          wordDelay={7}
          fontSize={88}
          highlight={['GoHighLevel', 'Agency', 'Owner']}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
