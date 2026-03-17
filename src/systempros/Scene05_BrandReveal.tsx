// Scene 5: Brand Reveal — flash + logo + pulse rings + radiating circuit traces
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';
import { GlowOrb } from './GlowOrb';
import { PulseRing } from './PulseRing';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';
import { circuitPath } from './circuitPath';

export const Scene05_BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashOpacity = interpolate(frame, [0, 3, 14], [1, 1, 0], { extrapolateRight: 'clamp' });
  const glowScale = spring({ frame, fps, config: { stiffness: 60, damping: 20 }, from: 0.2, to: 1 });
  const glowOpacity = interpolate(frame, [0, 10, 40, 80], [0, 0.8, 0.5, 0.3], { extrapolateRight: 'clamp' });
  const logoScale = spring({ frame: Math.max(0, frame - 8), fps, config: { stiffness: 140, damping: 14 }, from: 0, to: 1 });
  const logoOpacity = interpolate(frame, [8, 22], [0, 1], { extrapolateRight: 'clamp' });
  const nameScale = spring({ frame: Math.max(0, frame - 25), fps, config: { stiffness: 150, damping: 16 }, from: 0.5, to: 1 });
  const nameOpacity = interpolate(frame, [25, 42], [0, 1], { extrapolateRight: 'clamp' });
  const urlOpacity = interpolate(frame, [50, 68], [0, 1], { extrapolateRight: 'clamp' });
  const taglineOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill style={{
        opacity: glowOpacity,
        transform: `scale(${glowScale})`,
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${COLORS.cyan}55 0%, ${COLORS.cyan}11 40%, transparent 70%)`,
      }} />

      <ParticleField color={COLORS.purple} opacity={0.12} particleCount={30} seed="reveal" speed={0.4} />

      <GlowOrb color={COLORS.purple} x={25} y={35} size={400} speed={0.3} />
      <GlowOrb color={COLORS.cyan} x={75} y={65} size={350} speed={0.4} />

      {/* Pulse rings from logo center */}
      <PulseRing x={960} y={380} color={COLORS.cyan} delay={10} ringCount={5} ringInterval={12} maxRadius={500} duration={50} />

      {/* Radiating circuit traces from center to corners */}
      <AnimatedLine d={circuitPath(960, 540, 100, 100, 3, 'rev-tl')} color={COLORS.cyan} delay={15} duration={50} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d={circuitPath(960, 540, 1820, 100, 3, 'rev-tr')} color={COLORS.cyan} delay={18} duration={50} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d={circuitPath(960, 540, 100, 980, 3, 'rev-bl')} color={COLORS.purple} delay={21} duration={50} opacity={0.12} strokeWidth={1} />
      <AnimatedLine d={circuitPath(960, 540, 1820, 980, 3, 'rev-br')} color={COLORS.purple} delay={24} duration={50} opacity={0.12} strokeWidth={1} />

      {/* Horizontal accent lines */}
      <AnimatedLine d="M 400 540 L 0 540" color={COLORS.cyan} delay={30} duration={25} opacity={0.2} strokeWidth={1.5} />
      <AnimatedLine d="M 1520 540 L 1920 540" color={COLORS.cyan} delay={33} duration={25} opacity={0.2} strokeWidth={1.5} />

      {/* White flash */}
      <AbsoluteFill style={{ backgroundColor: 'white', opacity: flashOpacity }} />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          width: 140, height: 140, borderRadius: 32, overflow: 'hidden',
          boxShadow: `0 0 60px ${COLORS.cyan}66`,
        }}>
          <Img src={staticFile('systempros/logo-systempros.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{
          opacity: nameOpacity, transform: `scale(${nameScale})`,
          fontSize: 80, fontWeight: 900, color: COLORS.white,
          fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: -2,
          textShadow: `0 0 40px ${COLORS.cyan}66`,
        }}>
          SYSTEM PROS AI
        </div>

        <div style={{ opacity: urlOpacity, fontSize: 28, fontWeight: 500, color: COLORS.cyan, fontFamily: 'system-ui, sans-serif', letterSpacing: 4 }}>
          systempros.ai
        </div>

        <div style={{ opacity: taglineOpacity, fontSize: 36, fontWeight: 600, color: COLORS.white, fontFamily: 'system-ui, sans-serif', marginTop: 20 }}>
          AI Agents For Every Channel
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
