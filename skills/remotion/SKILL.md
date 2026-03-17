---
name: remotion
description: >
  Expert guide for building Remotion video projects — React-based programmatic video creation.
  Use this skill whenever the user is working in a Remotion project, creating video compositions,
  animating with interpolate() or spring(), registering compositions in Root.tsx, rendering videos
  with the Remotion CLI, or asking anything about Remotion, @remotion/* packages, or creating
  videos with React. Also trigger for questions about useCurrentFrame, useVideoConfig, AbsoluteFill,
  Sequence, staticFile, delayRender, or any Remotion-specific patterns. When in doubt, use this skill.
---

# Remotion Development Skill

Remotion creates videos by rendering React components frame-by-frame using headless Chrome, then stitching frames into a video with FFmpeg. Every frame is a pure function of its frame number — no mutable state, no randomness, no time-based values.

## Project Structure

```
my-project/
├── remotion.config.ts        # Optional CLI/bundler config
├── public/                   # Static assets (images, audio, video)
└── src/
    ├── index.ts              # Entry: calls registerRoot()
    ├── Root.tsx              # Registers all <Composition> elements
    └── MyComposition.tsx     # Individual composition components
```

**`src/index.ts`** — must be its own file (not combined with Root.tsx, to avoid Fast Refresh issues):
```ts
import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';
registerRoot(RemotionRoot);
```

**`src/Root.tsx`** — registers compositions:
```tsx
import {Composition} from 'remotion';
import {MyComp} from './MyComposition';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MyVideo"
    component={MyComp}
    durationInFrames={150}   // seconds * fps
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{text: 'Hello'}}
  />
);
```

## Core APIs

### `useCurrentFrame()` + `useVideoConfig()`
```tsx
import {useCurrentFrame, useVideoConfig} from 'remotion';

const frame = useCurrentFrame();        // 0-indexed integer (0 to durationInFrames-1)
const {fps, width, height, durationInFrames} = useVideoConfig();
```

**Inside `<Sequence from={30}>`, `useCurrentFrame()` returns frames relative to the Sequence start** — not the absolute timeline position. Pass absolute frame as a prop if children need it.

### `interpolate()` — keyframe animation
```tsx
import {interpolate, Easing} from 'remotion';

// Fade in over first 30 frames
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateRight: 'clamp',  // ALWAYS clamp unless you want values outside output range
});

// Multi-keyframe: fade in, hold, fade out
const opacity = interpolate(frame, [0, 15, 85, 100], [0, 1, 1, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// With easing
const x = interpolate(frame, [0, 60], [-200, 0], {
  easing: Easing.out(Easing.cubic),
  extrapolateRight: 'clamp',
});
```

Extrapolation options: `'extend'` (default), `'clamp'`, `'wrap'`, `'identity'`.

### `spring()` — physics-based animation
```tsx
import {spring} from 'remotion';

const {fps} = useVideoConfig();

const scale = spring({
  frame,
  fps,           // always required
  config: {
    stiffness: 100,          // higher = snappier
    damping: 10,             // higher = less bounce
    mass: 1,                 // higher = heavier/slower
    overshootClamping: false,
  },
  from: 0,
  to: 1,
  delay: 0,              // frames before animation starts
  durationInFrames: 30,  // optional: constrain to exact duration
});
```

Spring naturally settles — no clamping needed. Overshoot is normal unless `overshootClamping: true`.

### `interpolateColors()`
```tsx
import {interpolateColors} from 'remotion';

const color = interpolateColors(frame, [0, 60], ['red', '#0000ff']);
// Returns rgba() string. Supports named colors, hex, rgb(), hsl()
```

## Layout Components

### `<AbsoluteFill>` — full-frame layer
```tsx
import {AbsoluteFill} from 'remotion';

<AbsoluteFill style={{backgroundColor: 'black'}}>
  {/* background */}
  <AbsoluteFill><Video src={staticFile('bg.mp4')} /></AbsoluteFill>
  {/* foreground (renders on top) */}
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
    <h1 style={{color: 'white'}}>Hello</h1>
  </AbsoluteFill>
</AbsoluteFill>
```

Later children render on top. It's a `position: absolute; width: 100%; height: 100%; display: flex` div.

### `<Sequence>` — timing control
```tsx
import {Sequence} from 'remotion';

// Show Scene2 from frame 60 to 150
<Sequence from={60} durationInFrames={90} name="Scene 2">
  <Scene2 />   {/* useCurrentFrame() returns 0 inside here */}
</Sequence>

// Negative from: trim start of child (skip first 15 frames of child's animation)
<Sequence from={-15} durationInFrames={45}>
  <MyContent />
</Sequence>
```

Props: `from`, `durationInFrames`, `layout` (`'absolute-fill'` | `'none'`), `name`, `premountFor`.
Use `layout="none"` inside Three.js canvas contexts.

### `<Series>` — sequential scenes
```tsx
import {Series} from 'remotion';

<Series>
  <Series.Sequence durationInFrames={60}><Scene1 /></Series.Sequence>
  <Series.Sequence durationInFrames={90} offset={-10}><Scene2 /></Series.Sequence>
</Series>
```

`offset`: positive = gap, negative = overlap between scenes.

## Assets

### `staticFile()` — always use for assets in `public/`
```tsx
import {staticFile} from 'remotion';

const src = staticFile('image.png');      // public/image.png
const audio = staticFile('music/bg.mp3'); // public/music/bg.mp3
// Do NOT pre-encode paths — staticFile() handles special chars automatically
```

### `<Img>` — use instead of `<img>`
```tsx
import {Img} from 'remotion';
<Img src={staticFile('logo.png')} />
```

Remotion's `<Img>` waits for the image to fully load before capturing the frame. Native `<img>` may produce blank/partial frames.

### `<Audio>`
```tsx
import {Audio} from 'remotion';

<Audio
  src={staticFile('music.mp3')}
  volume={0.8}
  volume={(f) => interpolate(f, [0, 30], [0, 1], {extrapolateRight: 'clamp'})} // dynamic
  trimBefore={30}   // skip first 30 frames of audio (was: startFrom — deprecated)
  trimAfter={300}   // stop audio at frame 300 (was: endAt — deprecated)
  loop={false}
/>
```

### `<OffthreadVideo>` vs `<Video>`
- Use `<OffthreadVideo>` (from `remotion`) for server-side rendering — frame-perfect, broad format support
- Use `<Video>` (from `@remotion/media`) for client-side rendering and looping

```tsx
import {OffthreadVideo} from 'remotion';
<OffthreadVideo src={staticFile('clip.mp4')} trimBefore={0} trimAfter={90} />
```

## Deterministic Randomness

**Never use `Math.random()` or `Date.now()`** — frames render in parallel across threads; non-deterministic values cause flickering.

```tsx
import {random} from 'remotion';

random(1)             // always same value for seed 1
random('particle-3')  // always same value for this seed string
random(null)          // true random (non-deterministic, use carefully)

// Pattern for particle arrays:
const particles = Array.from({length: 20}, (_, i) => ({
  x: random(`x-${i}`) * width,
  y: random(`y-${i}`) * height,
}));
```

## Async Data Loading

```tsx
import {delayRender, continueRender, cancelRender} from 'remotion';

const MyComp: React.FC = () => {
  // MUST be in useState — not useEffect, not component body
  const [handle] = useState(() => delayRender('Loading data'));
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(d => { setData(d); continueRender(handle); })
      .catch(err => cancelRender(err));
  }, [handle]);

  if (!data) return null;
  return <div>{data.title}</div>;
};
```

`continueRender()` must be called within 30 seconds or the render fails with a timeout.

## Dynamic Metadata

Make composition dimensions/duration/fps data-driven:

```tsx
import {CalculateMetadataFunction} from 'remotion';

const calculateMetadata: CalculateMetadataFunction<Props> = async ({props}) => {
  const meta = await fetchMeta(props.videoUrl);
  return {
    durationInFrames: Math.round(meta.duration * 30),
    fps: 30,
    width: meta.width,
    height: meta.height,
    props: {...props},
  };
};

// In Root.tsx:
<Composition
  id="Dynamic"
  component={MyComp}
  durationInFrames={1}   // placeholder — overridden
  fps={30} width={1920} height={1080}
  defaultProps={{videoUrl: ''}}
  calculateMetadata={calculateMetadata}
/>
```

## CLI Commands

```bash
npx remotion studio              # Start preview server (Studio)
npx remotion render              # Render default composition
npx remotion render MyVideo      # Render specific composition
npx remotion render MyVideo out/video.mp4 --codec h264 --crf 18
npx remotion still MyVideo --frame 30 out/thumb.png
npx remotion compositions        # List all registered compositions
npx remotion upgrade             # Upgrade all @remotion/* packages
```

Key render flags: `--codec` (h264/h265/vp8/vp9/prores), `--crf` (quality, lower=better), `--concurrency`, `--frames 0-100`, `--scale 2`, `--props '{"key":"val"}'`, `--overwrite`.

## `remotion.config.ts`

```ts
import {Config} from '@remotion/cli/config';

Config.setCodec('h264');
Config.setOutputLocation('out/video.mp4');
Config.setCrf(18);
Config.setConcurrency(4);
Config.overrideWebpackConfig(async (current) => ({...current}));
```

## Critical Pitfalls

| Mistake | Fix |
|---------|-----|
| `Math.random()` in components | Use `random('seed')` |
| `Date.now()` in components | Derive from `frame / fps` |
| Missing `extrapolateRight: 'clamp'` | interpolate() extends by default — add clamp |
| `spring()` without `fps` | Always destructure `fps` from `useVideoConfig()` |
| `<img>` instead of `<Img>` | Use Remotion's `<Img>` for reliable frame capture |
| Hardcoded asset paths | Use `staticFile('name.png')` |
| `delayRender()` in `useEffect` | Create handle in `useState(() => delayRender(...))` |
| `interface Props` | Use `type Props = {...}` (Remotion convention) |
| `startFrom`/`endAt` on Audio/Video | Use `trimBefore`/`trimAfter` (v4.0.319+) |
| Shared mutable state between frames | All animation state must derive from frame number |
| `durationInFrames={10}` for 10 seconds | `durationInFrames = seconds * fps` (e.g., 300 at 30fps) |
| `registerRoot()` in same file as Root | Keep `src/index.ts` separate from `src/Root.tsx` |

## Minimal Working Composition

```tsx
// src/MyComp.tsx
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

type Props = {text: string; color: string};

export const MyComp: React.FC<Props> = ({text, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
  const scale = spring({frame, fps, config: {stiffness: 80, damping: 12}});

  return (
    <AbsoluteFill style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{opacity, transform: `scale(${scale})`, color, fontSize: 80, fontWeight: 'bold'}}>
        {text}
      </div>
    </AbsoluteFill>
  );
};
```

## Frame Math Quick Reference

```
durationInFrames = seconds * fps
First frame = 0,  Last frame = durationInFrames - 1
frame → seconds:  frame / fps
seconds → frame:  Math.floor(seconds * fps)
```
