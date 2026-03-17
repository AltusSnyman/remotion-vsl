import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from './constants';
import { GlowOrb } from './GlowOrb';
import { AnimatedBar } from './AnimatedBar';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';

type StatRowProps = { text: string; color: string; icon: string; delay: number; barPercentage?: number };

const StatRow: React.FC<StatRowProps> = ({ text, color, icon, delay, barPercentage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);
  const x = spring({ frame: localFrame, fps, config: { stiffness: 140, damping: 18 }, from: 400, to: 0 });
  const opacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ opacity, transform: `translateX(${x}px)`, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 48, fontWeight: 700, color: COLORS.white, fontFamily: 'system-ui, sans-serif' }}>
        <span style={{ fontSize: 52, color, textShadow: `0 0 20px ${color}88` }}>{icon}</span>
        <span>{text}</span>
      </div>
      {barPercentage !== undefined && (
        <div style={{ paddingLeft: 76 }}>
          <AnimatedBar percentage={barPercentage} color={color} delay={delay + 15} duration={25} width={400} height={8} />
        </div>
      )}
    </div>
  );
};

export const Scene02_Pain: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  // 360 frames total
  const fadeOut = interpolate(frame, [340, 360], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.25 }}>
        <Img src={staticFile('fundyourbusiness/bg-dark-grid.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <ParticleField color={COLORS.red} opacity={0.12} particleCount={25} seed="pain" speed={0.3} />
      <GlowOrb color={COLORS.red} x={70} y={40} size={400} speed={0.3} />
      <AnimatedLine d="M 100 80 L 1820 80" color={COLORS.red} delay={0} duration={40} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d="M 160 150 L 160 900" color={COLORS.red} delay={5} duration={50} opacity={0.1} strokeWidth={1} />
      <AnimatedLine d="M 1400 100 L 1800 500" color={COLORS.orange} delay={15} duration={30} opacity={0.1} strokeWidth={1} />
      <AnimatedLine d="M 1500 600 L 1850 950" color={COLORS.red} delay={25} duration={30} opacity={0.08} strokeWidth={1} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 200, gap: 50, flexDirection: 'column' }}>
        <StatRow text="62% of calls go unanswered" color={COLORS.red} icon="✕" delay={0} barPercentage={62} />
        <StatRow text="85% of customers never call back" color={COLORS.orange} icon="✕" delay={25} barPercentage={85} />
        <StatRow text="Every missed lead goes to your competitor" color={COLORS.red} icon="→" delay={50} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
