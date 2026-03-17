// Scene 3: Agitate — "Right now, while you sleep..." + pulse rings + zigzag lines
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';
import { WordReveal } from './WordReveal';
import { GlowOrb } from './GlowOrb';
import { PulseRing } from './PulseRing';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';

export const Scene03_Agitate: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const redPulse = interpolate(frame % 60, [0, 30, 60], [0.05, 0.15, 0.05]);
  const fadeOut = interpolate(frame, [215, 240], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.2 }}>
        <Img src={staticFile('systempros/bg-dark-grid.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      <ParticleField color={COLORS.orange} opacity={0.1} particleCount={20} seed="agitate" speed={0.4} />

      {/* Red tension overlay */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${COLORS.red}${Math.round(redPulse * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
      }} />

      <GlowOrb color={COLORS.orange} x={60} y={50} size={500} speed={0.3} />

      {/* Pulse rings — ominous expanding rings */}
      <PulseRing x={960} y={540} color={COLORS.red} delay={20} ringCount={4} ringInterval={18} maxRadius={450} duration={50} />

      {/* Zigzag lines on left side */}
      <AnimatedLine d="M 0 180 L 70 280 L 0 380 L 70 480 L 0 580 L 70 680 L 0 780 L 70 880" color={COLORS.orange} delay={5} duration={45} opacity={0.2} strokeWidth={1.5} />
      {/* Zigzag lines on right side */}
      <AnimatedLine d="M 1920 200 L 1850 300 L 1920 400 L 1850 500 L 1920 600 L 1850 700 L 1920 800 L 1850 900" color={COLORS.orange} delay={8} duration={45} opacity={0.2} strokeWidth={1.5} />

      {/* Horizontal scanner line */}
      <AnimatedLine d="M 200 540 L 1720 540" color={COLORS.red} delay={10} duration={30} opacity={0.08} strokeWidth={0.5} />

      {/* Corner accent traces */}
      <AnimatedLine d="M 0 0 L 120 0 L 120 120" color={COLORS.red} delay={0} duration={20} opacity={0.2} strokeWidth={1.5} />
      <AnimatedLine d="M 1920 0 L 1800 0 L 1800 120" color={COLORS.red} delay={3} duration={20} opacity={0.2} strokeWidth={1.5} />
      <AnimatedLine d="M 0 1080 L 120 1080 L 120 960" color={COLORS.red} delay={6} duration={20} opacity={0.2} strokeWidth={1.5} />
      <AnimatedLine d="M 1920 1080 L 1800 1080 L 1800 960" color={COLORS.red} delay={9} duration={20} opacity={0.2} strokeWidth={1.5} />

      <AbsoluteFill style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 40,
        paddingLeft: 120,
        paddingRight: 120,
      }}>
        <WordReveal text="Right now, while you sleep..." startFrame={0} wordDelay={8} fontSize={80} highlightColor={COLORS.orange} />
        <WordReveal text="leads are slipping through the cracks" startFrame={45} wordDelay={7} fontSize={80} highlight={['slipping', 'cracks']} highlightColor={COLORS.orange} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
