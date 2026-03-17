// Scene 6: 0-60f (2s) — Widget slides onto website mockup
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from './constants';

export const Scene6Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Website slides in from left
  const websiteX = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 22 },
    from: -200,
    to: 0,
  });

  // Widget slides in from right with bounce
  const widgetX = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { stiffness: 160, damping: 12 },
    from: 300,
    to: 0,
  });
  const widgetOpacity = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });

  // Glow pulse on widget
  const glow = interpolate(frame % 40, [0, 20, 40], [0.7, 1, 0.7]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.3 }}>
        <Img
          src={staticFile('opener/bg-texture.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Layout: website left, widget right */}
      <AbsoluteFill
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        {/* Website mockup */}
        <div
          style={{
            transform: `translateX(${websiteX}px)`,
            flex: 1,
            maxWidth: 900,
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            border: `1px solid ${COLORS.whatsappGreen}44`,
            boxShadow: `0 0 60px ${COLORS.ghlPurple}44`,
          }}
        >
          <Img
            src={staticFile('opener/widget-open.png')}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* Green border glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              boxShadow: `inset 0 0 30px ${COLORS.whatsappGreen}22`,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Widget showcase */}
        <div
          style={{
            opacity: widgetOpacity,
            transform: `translateX(${widgetX}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            minWidth: 320,
          }}
        >
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: `0 0 ${60 * glow}px ${COLORS.whatsappGreen}99`,
            }}
          >
            <Img
              src={staticFile('opener/whatsapp-bubble.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.white,
              fontFamily: 'system-ui, sans-serif',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Works with your<br />
            <span style={{ color: COLORS.whatsappGreen }}>GHL Chatbot</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
