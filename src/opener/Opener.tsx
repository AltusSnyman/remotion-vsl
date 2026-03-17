// Main YouTube Opener composition — wires all scenes together with <Series>
import { AbsoluteFill, Series } from 'remotion';
import { Scene1Intro } from './Scene1Intro';
import { Scene2Hook } from './Scene2Hook';
import { Scene3WhatsApp } from './Scene3WhatsApp';
import { Scene4Problem } from './Scene4Problem';
import { Scene5UntilNow } from './Scene5UntilNow';
import { Scene6Reveal } from './Scene6Reveal';
import { Scene7EndCard } from './Scene7EndCard';

export const Opener: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      <Series>
        {/* Scene 1: Dark background fades in — 1.5s */}
        <Series.Sequence durationInFrames={45} name="Intro">
          <Scene1Intro />
        </Series.Sequence>

        {/* Scene 2: "If you're a GHL Agency Owner" — 3s anim + 3s hold */}
        <Series.Sequence durationInFrames={180} offset={-10} name="Hook">
          <Scene2Hook />
        </Series.Sequence>

        {/* Scene 3: "...selling WhatsApp" — 2s anim + 3s hold */}
        <Series.Sequence durationInFrames={150} offset={-8} name="WhatsApp">
          <Scene3WhatsApp />
        </Series.Sequence>

        {/* Scene 4: "NO native widget" pain point — 2.5s anim + 3s hold */}
        <Series.Sequence durationInFrames={165} offset={-8} name="Problem">
          <Scene4Problem />
        </Series.Sequence>

        {/* Scene 5: UNTIL NOW reveal — 1.5s anim + 3s hold */}
        <Series.Sequence durationInFrames={135} offset={-5} name="UntilNow">
          <Scene5UntilNow />
        </Series.Sequence>

        {/* Scene 6: Widget on website — 2s anim + 3s hold */}
        <Series.Sequence durationInFrames={150} offset={-5} name="Reveal">
          <Scene6Reveal />
        </Series.Sequence>

        {/* Scene 7: End card / brand lock-up — 1s anim + 3s hold */}
        <Series.Sequence durationInFrames={120} name="EndCard">
          <Scene7EndCard />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
