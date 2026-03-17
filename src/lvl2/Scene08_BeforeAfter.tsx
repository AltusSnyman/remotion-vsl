import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';
import { GlowOrb } from './GlowOrb';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';
import { PulseRing } from './PulseRing';

type BulletProps = { text: string; delay: number; color: string };
const Bullet: React.FC<BulletProps> = ({ text, delay, color }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{ opacity, display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 500, color: COLORS.white, fontFamily: 'system-ui, sans-serif' }}>
      <span style={{ color, fontSize: 20 }}>●</span>{text}
    </div>
  );
};

export const Scene08_BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  // 585 frames total
  const fadeOut = interpolate(frame, [565, 585], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const beforeX = spring({ frame, fps, config: { stiffness: 120, damping: 18 }, from: -200, to: 0 });
  const beforeOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const afterX = spring({ frame: Math.max(0, frame - 10), fps, config: { stiffness: 120, damping: 18 }, from: 200, to: 0 });
  const afterOpacity = interpolate(frame, [10, 28], [0, 1], { extrapolateRight: 'clamp' });
  const dividerOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.15 }}>
        <Img src={staticFile('lvl2/ai-brain-network.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <ParticleField color={COLORS.purple} opacity={0.08} particleCount={20} seed="ba" speed={0.3} />
      <GlowOrb color={COLORS.purple} x={35} y={50} size={400} speed={0.2} />
      <GlowOrb color={COLORS.lavender} x={65} y={50} size={400} speed={0.25} />
      <AnimatedLine d="M 920 350 L 960 400 L 1000 350" color={COLORS.purple} delay={25} duration={15} opacity={0.4} strokeWidth={2} />
      <AnimatedLine d="M 920 500 L 960 550 L 1000 500" color={COLORS.purpleLight} delay={30} duration={15} opacity={0.3} strokeWidth={2} />
      <AnimatedLine d="M 920 650 L 960 700 L 1000 650" color={COLORS.lavender} delay={35} duration={15} opacity={0.4} strokeWidth={2} />
      <AnimatedLine d="M 200 200 L 1720 200" color={COLORS.purple} delay={0} duration={30} opacity={0.1} strokeWidth={0.5} />
      <AnimatedLine d="M 200 880 L 1720 880" color={COLORS.lavender} delay={5} duration={30} opacity={0.1} strokeWidth={0.5} />
      <AnimatedLine d="M 150 220 L 150 260 L 190 260" color={COLORS.purple} delay={10} duration={12} opacity={0.3} strokeWidth={2} />
      <AnimatedLine d="M 1770 220 L 1770 260 L 1730 260" color={COLORS.lavender} delay={13} duration={12} opacity={0.3} strokeWidth={2} />
      <AnimatedLine d="M 300 430 L 300 610" color={COLORS.purple} delay={15} duration={40} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d="M 1100 430 L 1100 610" color={COLORS.lavender} delay={20} duration={40} opacity={0.15} strokeWidth={1} />
      <PulseRing x={960} y={540} color={COLORS.purple} delay={5} ringCount={2} ringInterval={20} maxRadius={200} duration={40} />
      <AbsoluteFill style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 80 }}>
        <div style={{ opacity: beforeOpacity, transform: `translateX(${beforeX}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 500 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.purple, fontFamily: 'system-ui, sans-serif', textShadow: `0 0 20px ${COLORS.purple}66`, marginBottom: 10 }}>BEFORE A Human</div>
          <Bullet text="Prequalify leads instantly" delay={15} color={COLORS.purple} />
          <Bullet text="Answer FAQs automatically" delay={25} color={COLORS.purple} />
          <Bullet text="Book appointments 24/7" delay={35} color={COLORS.purple} />
          <Bullet text="Route to the right person" delay={45} color={COLORS.purple} />
        </div>
        <div style={{ opacity: dividerOpacity, width: 2, height: 350, background: `linear-gradient(to bottom, transparent, ${COLORS.purple}88, ${COLORS.lavender}88, transparent)` }} />
        <div style={{ opacity: afterOpacity, transform: `translateX(${afterX}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 500 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.lavender, fontFamily: 'system-ui, sans-serif', textShadow: `0 0 20px ${COLORS.lavender}66`, marginBottom: 10 }}>AFTER A Human</div>
          <Bullet text="Capture details when no one's free" delay={20} color={COLORS.lavender} />
          <Bullet text="Follow up with every missed lead" delay={30} color={COLORS.lavender} />
          <Bullet text="Available 24/7, never miss a beat" delay={40} color={COLORS.lavender} />
          <Bullet text="Plug the leaky bucket" delay={50} color={COLORS.lavender} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
