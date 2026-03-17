import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { COLORS } from './constants';
import { Scene01_Hook } from './Scene01_Hook';
import { Scene02_Pain } from './Scene02_Pain';
import { Scene03_Agitate } from './Scene03_Agitate';
import { Scene04_Tease } from './Scene04_Tease';
import { Scene05_BrandReveal } from './Scene05_BrandReveal';
import { Scene06_Channels } from './Scene06_Channels';
import { Scene07_Stats } from './Scene07_Stats';
import { Scene08_BeforeAfter } from './Scene08_BeforeAfter';
import { Scene09_CTA } from './Scene09_CTA';
import { Scene10_Lockup } from './Scene10_Lockup';

// PRECISE voice timestamps (seconds → frames at 30fps):
//
// Scene 1 Hook:     0.0s  → frame 0     |  voice: "$126,000... missed calls..."
// Scene 2 Pain:     9.0s  → frame 270   |  voice: "62%... 85%... competitor"
// Scene 3 Agitate:  21.0s → frame 630   |  voice: "Right now, while you sleep..."
// Scene 4 Tease:    29.0s → frame 870   |  voice: "What if you never missed..."
// Scene 5 Reveal:   34.0s → frame 1020  |  voice: "Introducing LVL2..."
// Scene 6 Channels: 42.0s → frame 1260  |  voice: "Phone... SMS... WhatsApp..."
// Scene 7 Stats:    61.0s → frame 1830  |  voice: "97%... 82%... 80%..."
// Scene 8 Before:   75.0s → frame 2250  |  voice: "Works before... and after..."
// Scene 9 CTA:      94.0s → frame 2820  |  voice: "Stop losing leads..."
// Scene 10 Lockup:  98.0s → frame 2940  |  voice: "LVL2. Every channel 24/7."
// END:              102.4s→ frame 3072

export const LVL2Intro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Audio src={staticFile('lvl2/voiceover.mp3')} volume={1} />

      {/* Each scene placed at its exact voice-sync frame */}
      <Sequence from={0} durationInFrames={285} name="Hook">
        <Scene01_Hook />
      </Sequence>

      <Sequence from={270} durationInFrames={375} name="Pain">
        <Scene02_Pain />
      </Sequence>

      <Sequence from={630} durationInFrames={255} name="Agitate">
        <Scene03_Agitate />
      </Sequence>

      <Sequence from={870} durationInFrames={165} name="Tease">
        <Scene04_Tease />
      </Sequence>

      <Sequence from={1020} durationInFrames={255} name="BrandReveal">
        <Scene05_BrandReveal />
      </Sequence>

      <Sequence from={1260} durationInFrames={585} name="Channels">
        <Scene06_Channels />
      </Sequence>

      <Sequence from={1830} durationInFrames={435} name="Stats">
        <Scene07_Stats />
      </Sequence>

      <Sequence from={2250} durationInFrames={585} name="BeforeAfter">
        <Scene08_BeforeAfter />
      </Sequence>

      <Sequence from={2820} durationInFrames={135} name="CTA">
        <Scene09_CTA />
      </Sequence>

      <Sequence from={2940} durationInFrames={132} name="Lockup">
        <Scene10_Lockup />
      </Sequence>
    </AbsoluteFill>
  );
};
