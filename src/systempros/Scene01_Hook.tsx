// Scene 1: Hook — "$126,000 Lost Per Year" + converging lines + downward graph
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';
import { WordReveal } from './WordReveal';
import { GlowOrb } from './GlowOrb';
import { AnimatedLine } from './AnimatedLine';
import { AnimatedGraph } from './AnimatedGraph';
import { ParticleField } from './ParticleField';
import { circuitPath } from './circuitPath';

export const Scene01_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [245, 270], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.35 }}>
        <Img src={staticFile('systempros/bg-dark-grid.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      {/* Particle field background */}
      <ParticleField color={COLORS.cyan} opacity={0.15} particleCount={30} seed="hook" speed={0.5} />

      <GlowOrb color={COLORS.cyan} x={50} y={45} size={600} speed={0.4} />
      <GlowOrb color={COLORS.red} x={30} y={60} size={300} speed={0.2} />

      {/* Converging diagonal lines from corners */}
      <AnimatedLine d="M 0 0 L 700 380" color={COLORS.cyan} delay={5} duration={40} opacity={0.25} strokeWidth={1.5} />
      <AnimatedLine d="M 1920 0 L 1220 380" color={COLORS.cyan} delay={8} duration={40} opacity={0.25} strokeWidth={1.5} />
      <AnimatedLine d="M 0 1080 L 600 700" color={COLORS.red} delay={12} duration={35} opacity={0.15} strokeWidth={1} />
      <AnimatedLine d="M 1920 1080 L 1320 700" color={COLORS.red} delay={15} duration={35} opacity={0.15} strokeWidth={1} />

      {/* Circuit trace along bottom */}
      <AnimatedLine d={circuitPath(100, 1020, 1820, 1020, 4, 'hook-bottom')} color={COLORS.cyan} delay={20} duration={50} opacity={0.12} strokeWidth={1} />

      {/* Horizontal scan lines */}
      <AnimatedLine d="M 0 200 L 1920 200" color={COLORS.cyan} delay={0} duration={60} opacity={0.06} strokeWidth={0.5} />
      <AnimatedLine d="M 0 880 L 1920 880" color={COLORS.cyan} delay={10} duration={60} opacity={0.06} strokeWidth={0.5} />

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 30 }}>
        <span style={{
          opacity: labelOpacity,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 6,
          color: COLORS.cyan,
          fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase',
        }}>
          Every Business Owner Needs To See This
        </span>

        <WordReveal
          text="$126,000 Lost Per Year"
          startFrame={15}
          wordDelay={8}
          fontSize={110}
          highlight={['$126,000']}
          highlightColor={COLORS.red}
        />

        <span style={{
          opacity: subOpacity,
          fontSize: 32,
          fontWeight: 500,
          color: COLORS.gray,
          fontFamily: 'system-ui, sans-serif',
        }}>
          to missed calls and unanswered messages
        </span>
      </AbsoluteFill>

      {/* Revenue down graph — bottom right */}
      <AnimatedGraph
        direction="down"
        color={COLORS.red}
        delay={25}
        duration={50}
        width={280}
        height={120}
        style={{ position: 'absolute', bottom: 100, right: 120 }}
      />

      {/* Small up graph bottom left — competitor gains */}
      <AnimatedGraph
        direction="up"
        color={COLORS.green}
        delay={40}
        duration={45}
        width={200}
        height={80}
        style={{ position: 'absolute', bottom: 110, left: 120, opacity: 0.5 }}
      />
    </AbsoluteFill>
  );
};
