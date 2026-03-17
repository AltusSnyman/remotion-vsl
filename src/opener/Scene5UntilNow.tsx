// Scene 5: 0-45f (1.5s) — UNTIL NOW — the dramatic reveal
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';

export const Scene5UntilNow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash effect at start
  const flashOpacity = interpolate(frame, [0, 3, 12], [1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  // Green glow explosion
  const glowScale = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 20 },
    from: 0.2,
    to: 1,
  });
  const glowOpacity = interpolate(frame, [0, 8, 30, 45], [0, 0.8, 0.5, 0.3], {
    extrapolateRight: 'clamp',
  });

  // Text scale-in
  const textScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { stiffness: 150, damping: 14 },
    from: 0.3,
    to: 1,
  });
  const textOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateRight: 'clamp' });

  // Subtitle fade in
  const subOpacity = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Green glow burst */}
      <AbsoluteFill
        style={{
          opacity: glowOpacity,
          transform: `scale(${glowScale})`,
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${COLORS.whatsappGreen}44 0%, ${COLORS.whatsappGreen}11 40%, transparent 70%)`,
        }}
      />

      {/* White flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: 'white',
          opacity: flashOpacity,
        }}
      />

      {/* "UNTIL NOW" */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            fontSize: 180,
            fontWeight: 900,
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            color: COLORS.white,
            letterSpacing: -4,
            textShadow: `0 0 80px ${COLORS.whatsappGreen}cc, 0 0 160px ${COLORS.whatsappGreen}44`,
            lineHeight: 1,
          }}
        >
          UNTIL NOW.
        </div>

        <div
          style={{
            opacity: subOpacity,
            fontSize: 36,
            fontWeight: 500,
            fontFamily: 'system-ui, sans-serif',
            color: COLORS.whatsappGreen,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Introducing the GHL WhatsApp Widget
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
