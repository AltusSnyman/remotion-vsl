import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';
import { GlowOrb } from './GlowOrb';
import { PulseRing } from './PulseRing';
import { ParticleField } from './ParticleField';
import { AnimatedLine } from './AnimatedLine';

export const Scene10_Lockup: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <ParticleField color={COLORS.purple} opacity={0.1} particleCount={30} seed="lockup" speed={0.2} />
      <GlowOrb color={COLORS.purple} x={50} y={45} size={500} speed={0.2} />
      <GlowOrb color={COLORS.lavender} x={40} y={55} size={300} speed={0.25} />
      <PulseRing x={960} y={420} color={COLORS.purple} delay={5} ringCount={2} ringInterval={20} maxRadius={250} duration={40} />
      <AnimatedLine d="M 600 200 L 600 240 L 640 240" color={COLORS.purple} delay={0} duration={12} opacity={0.2} strokeWidth={1.5} />
      <AnimatedLine d="M 1320 200 L 1320 240 L 1280 240" color={COLORS.purple} delay={3} duration={12} opacity={0.2} strokeWidth={1.5} />
      <AnimatedLine d="M 600 880 L 600 840 L 640 840" color={COLORS.lavender} delay={6} duration={12} opacity={0.2} strokeWidth={1.5} />
      <AnimatedLine d="M 1320 880 L 1320 840 L 1280 840" color={COLORS.lavender} delay={9} duration={12} opacity={0.2} strokeWidth={1.5} />
      <AbsoluteFill style={{ opacity: fadeIn, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 150, height: 150, borderRadius: 32, overflow: 'hidden', boxShadow: `0 0 50px ${COLORS.purple}55` }}>
          <Img src={staticFile('lvl2/logo-lvl2.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ fontSize: 80, fontWeight: 900, color: COLORS.white, fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: -1, textShadow: `0 0 30px ${COLORS.purple}55` }}>
          LVL2
        </div>
        <div style={{ fontSize: 24, fontWeight: 500, color: COLORS.lavender, fontFamily: 'system-ui, sans-serif', letterSpacing: 4 }}>
          lvl-2.com
        </div>
        <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.white, fontFamily: 'system-ui, sans-serif', marginTop: 16, letterSpacing: 2 }}>
          Never Miss a Lead. Every Channel. 24/7.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
