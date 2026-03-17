// Scene 4: 0-75f (2.5s) — "There's NO native WhatsApp widget" — the pain
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from './constants';
import { WordReveal } from './WordReveal';

export const Scene4Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [145, 165], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Website mockup slides in from bottom
  const mockupY = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { stiffness: 120, damping: 20 },
    from: 300,
    to: 0,
  });
  const mockupOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  // Red X shake
  const xScale = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { stiffness: 300, damping: 10 },
    from: 0,
    to: 1,
  });
  const xOpacity = interpolate(frame, [35, 48], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: 0.25 }}>
        <Img
          src={staticFile('opener/bg-texture.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Text top */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 80,
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <WordReveal
          text="You know there is NO native"
          startFrame={0}
          wordDelay={6}
          fontSize={72}
          highlight={['NO']}
          style={{ color: COLORS.white }}
        />
        <WordReveal
          text="WhatsApp Widget for websites"
          startFrame={36}
          wordDelay={6}
          fontSize={72}
          highlight={['WhatsApp', 'Widget']}
        />
      </AbsoluteFill>

      {/* Website mockup with grayscale + red X */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            position: 'relative',
            opacity: mockupOpacity,
            transform: `translateY(${mockupY}px)`,
            width: 900,
            height: 400,
          }}
        >
          <Img
            src={staticFile('opener/website-mockup.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 16,
              filter: 'grayscale(60%) brightness(0.6)',
              border: `1px solid ${COLORS.red}44`,
            }}
          />

          {/* Red X overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              opacity: xOpacity,
              transform: `scale(${xScale})`,
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: COLORS.red,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              color: 'white',
              fontWeight: 900,
              boxShadow: `0 0 30px ${COLORS.red}88`,
            }}
          >
            ✕
          </div>

          {/* "No widget here" label */}
          <div
            style={{
              position: 'absolute',
              bottom: -40,
              right: 0,
              opacity: xOpacity,
              fontSize: 22,
              color: COLORS.red,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
            }}
          >
            No widget here
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
