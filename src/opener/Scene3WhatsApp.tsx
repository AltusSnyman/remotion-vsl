// Scene 3: 0-60f (2s) — "...selling WhatsApp" + WhatsApp logo bounces in
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from './constants';
import { WordReveal } from './WordReveal';

export const Scene3WhatsApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const logoScale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { stiffness: 180, damping: 12 },
    from: 0,
    to: 1,
  });

  const logoOpacity = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: 'clamp' });

  const glowPulse = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.6, 1, 0.6],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: 0.3 }}>
        <Img
          src={staticFile('opener/bg-texture.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Text: selling WhatsApp */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 60,
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        <WordReveal
          text="and selling WhatsApp"
          startFrame={0}
          wordDelay={8}
          fontSize={96}
          highlight={['WhatsApp']}
        />

        {/* WhatsApp logo bubble */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: `0 0 ${60 * glowPulse}px ${COLORS.whatsappGreen}99`,
            }}
          >
            <Img
              src={staticFile('opener/whatsapp-bubble.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
