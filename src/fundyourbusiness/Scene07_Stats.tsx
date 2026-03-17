import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';
import { StatCounter } from './StatCounter';
import { GlowOrb } from './GlowOrb';
import { AnimatedBar } from './AnimatedBar';
import { AnimatedGraph } from './AnimatedGraph';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';

type StatLineProps = { value: number; suffix: string; label: string; color: string; startFrame: number };

const StatLine: React.FC<StatLineProps> = ({ value, suffix, label, color, startFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(Math.max(0, frame - startFrame), [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{ opacity, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        <StatCounter value={value} suffix={suffix} startFrame={startFrame} duration={25} color={color} fontSize={96} />
        <span style={{ fontSize: 32, fontWeight: 500, color: COLORS.white, fontFamily: 'system-ui, sans-serif', maxWidth: 500 }}>{label}</span>
      </div>
      <div style={{ paddingLeft: 8 }}>
        <AnimatedBar percentage={value} color={color} delay={startFrame + 5} duration={25} width={350} height={8} />
      </div>
    </div>
  );
};

export const Scene07_Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  // 558 frames total
  const fadeOut = interpolate(frame, [538, 558], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.2 }}>
        <Img src={staticFile('fundyourbusiness/bg-dark-grid.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <ParticleField color={COLORS.green} opacity={0.1} particleCount={20} seed="stats" speed={0.3} />
      <GlowOrb color={COLORS.emerald} x={40} y={40} size={500} speed={0.3} />
      <GlowOrb color={COLORS.gold} x={65} y={60} size={400} speed={0.25} />
      <AnimatedLine d="M 180 220 L 180 860" color={COLORS.emerald} delay={0} duration={80} opacity={0.12} strokeWidth={1} />
      <AnimatedLine d="M 100 100 L 1820 100" color={COLORS.emerald} delay={0} duration={50} opacity={0.06} strokeWidth={0.5} />
      <AnimatedLine d="M 100 980 L 1820 980" color={COLORS.emerald} delay={5} duration={50} opacity={0.06} strokeWidth={0.5} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 200, gap: 50, flexDirection: 'column' }}>
        <StatLine value={97} suffix="%" label="of AI voice agent users report increased revenue" color={COLORS.emerald} startFrame={0} />
        <StatLine value={82} suffix="%" label="saw stronger customer engagement" color={COLORS.gold} startFrame={30} />
        <StatLine value={80} suffix="%" label="saved 5+ hours every week" color={COLORS.blue} startFrame={60} />
      </AbsoluteFill>
      <AnimatedGraph direction="up" color={COLORS.emerald} delay={10} duration={40} width={240} height={100} style={{ position: 'absolute', top: 200, right: 120 }} />
      <AnimatedGraph direction="up" color={COLORS.gold} delay={40} duration={35} width={200} height={80} style={{ position: 'absolute', top: 440, right: 140 }} />
      <AnimatedGraph direction="up" color={COLORS.blue} delay={70} duration={35} width={200} height={80} style={{ position: 'absolute', top: 660, right: 140 }} />
    </AbsoluteFill>
  );
};
