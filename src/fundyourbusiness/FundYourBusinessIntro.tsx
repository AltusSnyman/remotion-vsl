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
// Scene 2 Pain:     9.5s  → frame 285   |  voice: "62%... 85%... competitor"
// Scene 3 Agitate:  21.0s → frame 630   |  voice: "Right now, while you sleep..."
// Scene 4 Tease:    28.6s → frame 858   |  voice: "But imagine this..."
// Scene 5 Reveal:   33.8s → frame 1014  |  voice: "Introducing Fund Your Business"
// Scene 6 Channels: 36.5s → frame 1095  |  voice: "Phone... SMS... WhatsApp..."
// Scene 7 Stats:    54.7s → frame 1641  |  voice: "97%... 82%... 80%..."
// Scene 8 Before:   72.8s → frame 2184  |  voice: "Works before... and after..."
// Scene 9 CTA:      90.8s → frame 2724  |  voice: "Stop losing leads..."
// Scene 10 Lockup:  94.2s → frame 2826  |  voice: "Fund Your Business, every channel 24/7."
// END:              97.9s → frame 2937

export const FundYourBusinessIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Audio src={staticFile('fundyourbusiness/voiceover.mp3')} volume={1} />

      {/* Each scene placed at its exact voice-sync frame */}
      <Sequence from={0} durationInFrames={285} name="Hook">
        <Scene01_Hook />
      </Sequence>

      <Sequence from={285} durationInFrames={360} name="Pain">
        <Scene02_Pain />
      </Sequence>

      <Sequence from={630} durationInFrames={243} name="Agitate">
        <Scene03_Agitate />
      </Sequence>

      <Sequence from={858} durationInFrames={171} name="Tease">
        <Scene04_Tease />
      </Sequence>

      <Sequence from={1014} durationInFrames={96} name="BrandReveal">
        <Scene05_BrandReveal />
      </Sequence>

      <Sequence from={1095} durationInFrames={561} name="Channels">
        <Scene06_Channels />
      </Sequence>

      <Sequence from={1641} durationInFrames={558} name="Stats">
        <Scene07_Stats />
      </Sequence>

      <Sequence from={2184} durationInFrames={555} name="BeforeAfter">
        <Scene08_BeforeAfter />
      </Sequence>

      <Sequence from={2724} durationInFrames={117} name="CTA">
        <Scene09_CTA />
      </Sequence>

      <Sequence from={2826} durationInFrames={111} name="Lockup">
        <Scene10_Lockup />
      </Sequence>
    </AbsoluteFill>
  );
};
