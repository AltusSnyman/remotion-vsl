// Scene 6: Channel Showcase — 6 icons with network connections + pulse rings
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from './constants';
import { ChannelIcon } from './ChannelIcon';
import { WordReveal } from './WordReveal';
import { GlowOrb } from './GlowOrb';
import { PulseRing } from './PulseRing';
import { AnimatedLine } from './AnimatedLine';
import { ParticleField } from './ParticleField';

const CHANNELS = [
  { src: 'systempros/phone-icon.png', label: 'Phone AI', color: COLORS.blue, delay: 0 },
  { src: 'systempros/sms-icon.png', label: 'SMS AI', color: COLORS.green, delay: 20 },
  { src: 'systempros/whatsapp-icon.png', label: 'WhatsApp AI', color: COLORS.whatsappGreen, delay: 40 },
  { src: 'systempros/imessage-icon.png', label: 'iMessage AI', color: COLORS.imessageBlue, delay: 60 },
  { src: 'systempros/chatbot-icon.png', label: 'Website AI', color: COLORS.cyan, delay: 80 },
  { src: 'systempros/meta-icon.png', label: 'Meta AI', color: COLORS.purple, delay: 100 },
];

// Approximate icon center positions in the 3x2 grid (based on gap:50, icon:160, centered)
const ICON_POSITIONS = [
  { x: 645, y: 340 }, { x: 855, y: 340 }, { x: 1065, y: 340 },  // row 1
  { x: 645, y: 580 }, { x: 855, y: 580 }, { x: 1065, y: 580 },  // row 2
];

// Network connections between icons (adjacent pairs)
const CONNECTIONS = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [0, 4], [1, 3],
];

export const Scene06_Channels: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [455, 480], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ opacity: bgOpacity * 0.2 }}>
        <Img src={staticFile('systempros/bg-dark-grid.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      <ParticleField color={COLORS.cyan} opacity={0.1} particleCount={25} seed="channels" speed={0.3} />

      <GlowOrb color={COLORS.cyan} x={50} y={50} size={800} speed={0.2} />
      <GlowOrb color={COLORS.purple} x={30} y={30} size={300} speed={0.3} />
      <GlowOrb color={COLORS.green} x={70} y={70} size={250} speed={0.35} />

      {/* Network connection lines between icons */}
      {CONNECTIONS.map(([a, b], i) => {
        const pa = ICON_POSITIONS[a];
        const pb = ICON_POSITIONS[b];
        const lineDelay = Math.max(CHANNELS[a].delay, CHANNELS[b].delay) + 15;
        return (
          <AnimatedLine
            key={`conn-${i}`}
            d={`M ${pa.x} ${pa.y} L ${pb.x} ${pb.y}`}
            color={COLORS.cyan}
            delay={lineDelay}
            duration={20}
            opacity={0.2}
            strokeWidth={1}
          />
        );
      })}

      {/* Pulse rings on each icon as it appears */}
      {ICON_POSITIONS.map((pos, i) => (
        <PulseRing
          key={`pulse-${i}`}
          x={pos.x}
          y={pos.y}
          color={CHANNELS[i].color}
          delay={CHANNELS[i].delay + 5}
          ringCount={2}
          ringInterval={12}
          maxRadius={100}
          duration={30}
        />
      ))}

      {/* Outer frame bracket lines */}
      <AnimatedLine d="M 400 180 L 400 220 L 440 220" color={COLORS.cyan} delay={5} duration={15} opacity={0.3} strokeWidth={2} />
      <AnimatedLine d="M 1520 180 L 1520 220 L 1480 220" color={COLORS.cyan} delay={8} duration={15} opacity={0.3} strokeWidth={2} />
      <AnimatedLine d="M 400 700 L 400 660 L 440 660" color={COLORS.cyan} delay={11} duration={15} opacity={0.3} strokeWidth={2} />
      <AnimatedLine d="M 1520 700 L 1520 660 L 1480 660" color={COLORS.cyan} delay={14} duration={15} opacity={0.3} strokeWidth={2} />

      <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: 60, flexDirection: 'column', gap: 50 }}>
        <WordReveal text="One AI. Every Channel." startFrame={5} wordDelay={10} fontSize={72} highlight={['Every', 'Channel.']} highlightColor={COLORS.cyan} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 50, maxWidth: 900, marginTop: 20 }}>
          {CHANNELS.map((ch) => (
            <ChannelIcon key={ch.label} {...ch} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
