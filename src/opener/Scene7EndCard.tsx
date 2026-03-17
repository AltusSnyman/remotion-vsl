// Scene 7: 0-30f (1s) — Brand lock-up end card
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from './constants';

export const Scene7EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const logoScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { stiffness: 140, damping: 16 },
    from: 0.5,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateRight: 'clamp' });

  const textOpacity = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.5 }}>
        <Img
          src={staticFile('opener/ghl-whatsapp-connection.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill style={{ backgroundColor: `${COLORS.bg}bb` }} />

      {/* Center content */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* GHL + WhatsApp logos row */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          {/* GHL badge */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${COLORS.ghlPurple}, ${COLORS.ghlPurpleLight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              fontWeight: 900,
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              boxShadow: `0 0 40px ${COLORS.ghlPurple}88`,
            }}
          >
            GHL
          </div>

          <div style={{ fontSize: 48, color: COLORS.gray }}>+</div>

          {/* WhatsApp badge */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: `0 0 40px ${COLORS.whatsappGreen}88`,
            }}
          >
            <Img
              src={staticFile('opener/whatsapp-bubble.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            opacity: textOpacity,
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: COLORS.white,
              lineHeight: 1.1,
            }}
          >
            GHL WhatsApp Widget
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: COLORS.whatsappGreen,
              marginTop: 12,
              letterSpacing: 2,
            }}
          >
            Native. Powerful. Finally.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
