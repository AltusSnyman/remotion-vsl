import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';
import { WordReveal } from './WordReveal';
import { GlowOrb } from './GlowOrb';
import { PulseRing } from './PulseRing';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';

export const Scene09_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  // 117 frames total
  const fadeOut = interpolate(frame, [97, 117], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnScale = spring({ frame: Math.max(0, frame - 50), fps, config: { stiffness: 150, damping: 14 }, from: 0.5, to: 1 });
  const btnOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: 'clamp' });
  const glowPulse = interpolate(frame % 40, [0, 20, 40], [0.5, 1, 0.5]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.2 }}>
        <Img src={staticFile('fundyourbusiness/bg-dark-grid.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <ParticleField color={COLORS.emerald} opacity={0.1} particleCount={25} seed="cta" speed={0.4} />
      <GlowOrb color={COLORS.emerald} x={50} y={45} size={600} speed={0.4} />
      <GlowOrb color={COLORS.green} x={60} y={55} size={300} speed={0.3} />
      <AnimatedLine d="M 0 0 L 800 600" color={COLORS.emerald} delay={40} duration={25} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d="M 1920 0 L 1120 600" color={COLORS.emerald} delay={43} duration={25} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d="M 0 1080 L 800 700" color={COLORS.green} delay={46} duration={25} opacity={0.12} strokeWidth={1} />
      <AnimatedLine d="M 1920 1080 L 1120 700" color={COLORS.green} delay={49} duration={25} opacity={0.12} strokeWidth={1} />
      <AnimatedLine d="M 300 650 L 700 650" color={COLORS.emerald} delay={52} duration={15} opacity={0.25} strokeWidth={1.5} />
      <AnimatedLine d="M 1220 650 L 1620 650" color={COLORS.emerald} delay={55} duration={15} opacity={0.25} strokeWidth={1.5} />
      <PulseRing x={960} y={680} color={COLORS.emerald} delay={55} ringCount={3} ringInterval={10} maxRadius={250} duration={35} />
      <AnimatedLine d="M 100 100 L 100 140 L 140 140" color={COLORS.emerald} delay={0} duration={12} opacity={0.3} strokeWidth={2} />
      <AnimatedLine d="M 1820 100 L 1820 140 L 1780 140" color={COLORS.emerald} delay={3} duration={12} opacity={0.3} strokeWidth={2} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 40, paddingLeft: 120, paddingRight: 120 }}>
        <WordReveal text="Stop losing leads." startFrame={0} wordDelay={8} fontSize={88} highlight={['losing']} highlightColor={COLORS.red} />
        <WordReveal text="Start closing them." startFrame={30} wordDelay={8} fontSize={88} highlight={['closing']} highlightColor={COLORS.emerald} />
        <div style={{ opacity: btnOpacity, transform: `scale(${btnScale})`, padding: '20px 60px', borderRadius: 16, border: `2px solid ${COLORS.emerald}`, backgroundColor: `${COLORS.emerald}22`, boxShadow: `0 0 ${30 * glowPulse}px ${COLORS.emerald}66`, fontSize: 32, fontWeight: 700, color: COLORS.white, fontFamily: 'system-ui, sans-serif', letterSpacing: 2 }}>
          See It In Action
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
