import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
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

// Voiceover timestamps (seconds):
// [0.0]  "$126,000."
// [3.0]  "That's how much the average business loses every year..."
// [9.0]  "62% of calls go unanswered, and 85%..."
// [16.0] "Every missed lead quietly walks straight to your competitor."
// [20.0] "Right now, while you're sleeping..."
// [27.0] "But imagine this."
// [28.0] "What if you never missed another lead again?"
// [31.0] "Introducing System Pros AI."
// [34.0] "Intelligent AI agents working across every channel..."
// [40.0] "Phone calls... SMS... WhatsApp... iMessage... website... Meta..."
// [52.0] "One AI, every channel, completely covered."
// [56.0] "97% of businesses..."
// [62.0] "82% see stronger... 80% save more than 5 hours..."
// [70.0] "System Pros AI works before a human..."
// [79.0] "And it works after as well..."
// [84.0] "24 hours a day, seven days a week."
// [87.0] "Stop losing leads."
// [89.0] "Start closing them."
// [91.0] "System Pros AI."
// [93.0] "Every channel 24/7."

export const SystemProsIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Voiceover audio */}
      <Audio src={staticFile('systempros/voiceover.mp3')} volume={1} />

      <Series>
        {/* 0–9s: Hook — "$126,000 lost per year" */}
        <Series.Sequence durationInFrames={270} name="Hook">
          <Scene01_Hook />
        </Series.Sequence>

        {/* 9–20s: Pain stats — "62%... 85%... competitor" */}
        <Series.Sequence durationInFrames={330} offset={-15} name="Pain">
          <Scene02_Pain />
        </Series.Sequence>

        {/* 20–28s: Agitate — "Right now, while you sleep..." */}
        <Series.Sequence durationInFrames={240} offset={-15} name="Agitate">
          <Scene03_Agitate />
        </Series.Sequence>

        {/* 28–34s: Tease — "What if you never missed..." + "Introducing..." */}
        <Series.Sequence durationInFrames={180} offset={-10} name="Tease">
          <Scene04_Tease />
        </Series.Sequence>

        {/* 34–40s: Brand Reveal — "System Pros AI" + "every channel" */}
        <Series.Sequence durationInFrames={180} offset={-10} name="BrandReveal">
          <Scene05_BrandReveal />
        </Series.Sequence>

        {/* 40–56s: Channel Showcase — all 6 channels listed */}
        <Series.Sequence durationInFrames={480} offset={-10} name="Channels">
          <Scene06_Channels />
        </Series.Sequence>

        {/* 56–70s: Stats — "97%... 82%... 80%..." */}
        <Series.Sequence durationInFrames={420} offset={-10} name="Stats">
          <Scene07_Stats />
        </Series.Sequence>

        {/* 70–87s: Before/After — "works before a human... and after" */}
        <Series.Sequence durationInFrames={510} offset={-10} name="BeforeAfter">
          <Scene08_BeforeAfter />
        </Series.Sequence>

        {/* 87–93s: CTA — "Stop losing leads. Start closing them." */}
        <Series.Sequence durationInFrames={180} offset={-10} name="CTA">
          <Scene09_CTA />
        </Series.Sequence>

        {/* 93–96s: Lockup — "System Pros AI. Every channel. 24/7." */}
        <Series.Sequence durationInFrames={100} name="Lockup">
          <Scene10_Lockup />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
