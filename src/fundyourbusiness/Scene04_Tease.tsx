import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';
import { NeonGlowText } from './NeonGlowText';
import { GlowOrb } from './GlowOrb';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';

export const Scene04_Tease: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  // 171 frames total
  const fadeOut = interpolate(frame, [151, 171], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const emeraldGlow = interpolate(frame, [0, 40], [0, 0.4], { extrapolateRight: 'clamp' });
  const particleOpacity = interpolate(frame, [0, 60], [0.08, 0.25], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.25 }}>
        <Img src={staticFile('fundyourbusiness/bg-dark-grid.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <ParticleField color={COLORS.emerald} opacity={particleOpacity} particleCount={35} seed="tease" speed={0.6} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${COLORS.emerald}${Math.round(emeraldGlow * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)` }} />
      <GlowOrb color={COLORS.emerald} x={50} y={50} size={700} speed={0.5} />
      <AnimatedLine d="M 960 0 L 960 320" color={COLORS.emerald} delay={0} duration={30} opacity={0.3} strokeWidth={1.5} />
      <AnimatedLine d="M 960 1080 L 960 760" color={COLORS.emerald} delay={3} duration={30} opacity={0.3} strokeWidth={1.5} />
      <AnimatedLine d="M 0 540 L 320 540" color={COLORS.emerald} delay={6} duration={30} opacity={0.3} strokeWidth={1.5} />
      <AnimatedLine d="M 1920 540 L 1600 540" color={COLORS.emerald} delay={9} duration={30} opacity={0.3} strokeWidth={1.5} />
      <AnimatedLine d="M 0 0 L 500 340" color={COLORS.emeraldLight} delay={5} duration={35} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d="M 1920 0 L 1420 340" color={COLORS.emeraldLight} delay={8} duration={35} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d="M 350 280 L 350 320 L 390 320" color={COLORS.emerald} delay={25} duration={15} opacity={0.4} strokeWidth={2} />
      <AnimatedLine d="M 1570 280 L 1570 320 L 1530 320" color={COLORS.emerald} delay={28} duration={15} opacity={0.4} strokeWidth={2} />
      <AnimatedLine d="M 350 800 L 350 760 L 390 760" color={COLORS.emerald} delay={31} duration={15} opacity={0.4} strokeWidth={2} />
      <AnimatedLine d="M 1570 800 L 1570 760 L 1530 760" color={COLORS.emerald} delay={34} duration={15} opacity={0.4} strokeWidth={2} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 140, paddingRight: 140 }}>
        <NeonGlowText text="What if you never missed another lead?" fontSize={90} glowColor={COLORS.emerald} startFrame={5} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
