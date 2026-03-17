// Scene 1: 0-45f (1.5s) — Background fades in with purple grid glow
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const glowOpacity = interpolate(frame, [15, 45], [0, 0.7], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Background texture */}
      <AbsoluteFill style={{ opacity }}>
        <Img
          src={staticFile('opener/bg-texture.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Purple center glow overlay */}
      <AbsoluteFill
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${COLORS.ghlPurple}33 0%, transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};
