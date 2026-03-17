# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

AI Video Factory — generates cinematic marketing videos programmatically using **Remotion** (React-based video framework), **Gemini AI** (image generation), and **11 Labs** (voiceover). Claude Code orchestrates the entire pipeline.

Given an MP3 voiceover file and a brand/website URL, this system:
1. Transcribes the audio with precise timestamps (via Gemini)
2. Researches the brand's website for colors, style, and messaging
3. Generates all visual assets (icons, logos, backgrounds) via Gemini image gen
4. Builds a 10-scene Remotion composition synced frame-by-frame to the voiceover
5. Renders the final MP4 video

## Common Commands

```bash
# Development
npx remotion studio                # Start Remotion dev server (interactive preview)
npm run dev                        # Alias for remotion studio

# Type checking & linting
npx tsc --noEmit                   # TypeScript check (strict mode, noUnusedLocals)
npm run lint                       # ESLint + tsc combined

# Preview a single frame
npx remotion still <CompositionId> --frame <N> out/preview.png

# Render final video
npx remotion render <CompositionId> out/output.mp4 --codec h264 --crf 16

# Upgrade Remotion
npm run upgrade
```

Composition IDs (defined in `src/Root.tsx`): `FundYourBusinessIntro`, `LVL2Intro`, `SystemProsIntro`, `GHLWhatsAppOpener`, `HelloWorld`, `OnlyLogo`

## Architecture

```
src/Root.tsx              ← Entry point: registers all <Composition> components
src/<client>/             ← One folder per client video
  constants.ts            ← Brand colors, palette
  <Client>Intro.tsx       ← Main composition: Sequences + Audio, absolute frame positioning
  Scene01_Hook.tsx        ← Individual scene components (01-10)
  ...Scene10_Lockup.tsx
  WordReveal.tsx          ← Reusable animation components (copied per client, customized)
  NeonGlowText.tsx
  ParticleField.tsx
  (etc.)
public/<client>/          ← Static assets: voiceover.mp3, generated images
```

Current clients: `fundyourbusiness`, `lvl2`, `systempros`, `opener` (shorter format). `HelloWorld` is the Remotion starter template.

Each client's main composition (`<Client>Intro.tsx`) uses absolute `<Sequence from={frame}>` positioning — NOT `<Series>` — to sync scenes to voiceover timestamps.

## Workflow: Creating a New Client Video

### Step 1: Gather Inputs

You need:
- **MP3 voiceover** — recorded via 11 Labs or similar. Place it in `public/<client>/voiceover.mp3`
- **Brand name** and **website URL** — for color extraction and branding
- **Tagline** — one-line value proposition

### Step 2: Transcribe with Precise Timestamps

Use Gemini to transcribe the MP3 with start/end timestamps for every sentence:

```
Format: [START_SECONDS - END_SECONDS] "exact words spoken"
```

This is critical — every scene's `<Sequence from={frame}>` depends on these timestamps. Convert seconds to frames: `frame = seconds * 30` (at 30fps).

### Step 3: Research the Brand

Fetch the client's website to extract:
- **Primary color** (hex) — used for accent glows, highlights, text shadows
- **Secondary color** — for softer accents
- **Background darkness** — usually `#07080a` to `#0c0d10`
- **Fonts** — heading + body
- **Logo style** — text logo vs icon logo

### Step 4: Generate Images

Use the **nano-banana** skill to generate 9-10 images:

```bash
# Background
python3 ~/.claude/skills/nano-banana/scripts/generate_image.py "Dark futuristic grid background, deep [BRAND_COLOR] tint, circuit traces" -o public/<client>/bg-dark-grid.png -m gemini-3.1-flash-image-preview -a 16:9

# Channel icons (1:1 each)
# phone-icon.png, sms-icon.png, whatsapp-icon.png, imessage-icon.png, chatbot-icon.png, meta-icon.png

# Logo
python3 ~/.claude/skills/nano-banana/scripts/generate_image.py "[BRAND_NAME] text logo, bold futuristic, [COLOR] neon glow, black bg, clean SVG style" -o public/<client>/logo.png -m gemini-3.1-flash-image-preview -a 1:1

# AI network visual
python3 ~/.claude/skills/nano-banana/scripts/generate_image.py "Neural network visualization, [COLOR] nodes, dark bg" -o public/<client>/ai-brain-network.png -m gemini-3.1-flash-image-preview -a 16:9
```

Generate all images in parallel for speed.

### Step 5: Build the Composition

Create a new folder `src/<client>/` with:

1. **`constants.ts`** — Brand color palette
2. **Copy reusable components** from an existing client folder (AnimatedLine, PulseRing, AnimatedBar, AnimatedGraph, ParticleField, ChannelIcon, StatCounter, NeonGlowText, WordReveal, GlowOrb, circuitPath)
3. **Update defaults** in copied WordReveal/NeonGlowText to use new brand colors
4. **Build 10 scene components** (Scene01_Hook through Scene10_Lockup)
5. **`<ClientName>Intro.tsx`** — Main composition using absolute `<Sequence from={frame}>` positioning synced to voiceover timestamps

### Step 6: Sync Scenes to Voice (CRITICAL)

Use `<Sequence from={frame}>` with absolute frame positions — NOT `<Series>` with offsets. This prevents accumulated timing drift.

```tsx
// CORRECT — absolute positioning
<Sequence from={0} durationInFrames={285} name="Hook">
<Sequence from={270} durationInFrames={375} name="Pain">
<Sequence from={630} durationInFrames={255} name="Agitate">

// WRONG — Series with offsets accumulates drift
<Series>
  <Series.Sequence durationInFrames={285} offset={-10}>
```

Each scene's `from` value = voice timestamp in seconds * 30.

### Step 7: Register and Render

Add to `src/Root.tsx`:
```tsx
<Composition
  id="ClientNameIntro"
  component={ClientIntro}
  durationInFrames={totalFrames}  // audio duration * 30
  fps={30}
  width={1920}
  height={1080}
/>
```

Verify and render:
```bash
npx tsc --noEmit                    # TypeScript check
npx remotion still ClientIntro --frame 100 out/preview.png  # Preview
npx remotion render ClientIntro out/client-intro.mp4 --codec h264 --crf 16
```

## 10-Scene Structure (PAS Marketing Framework)

Every video follows this proven structure:

| # | Scene | Purpose | Voice Content |
|---|-------|---------|---------------|
| 1 | **Hook** | Shock stat | "$126,000 lost per year..." |
| 2 | **Pain Stats** | Stack the pain | "62% unanswered... 85% never call back..." |
| 3 | **Agitate** | Make it personal | "Right now, while you sleep..." |
| 4 | **Tease** | Pivot to hope | "What if you never missed another lead?" |
| 5 | **Brand Reveal** | The solution | Flash + logo + brand name |
| 6 | **Channel Showcase** | Show scope | 6 neon icons (Phone, SMS, WhatsApp, iMessage, Chatbot, Meta) |
| 7 | **Stats/Proof** | Social proof | "97%... 82%... 80%..." animated counters |
| 8 | **Before/After** | How it works | AI before human + AI after human |
| 9 | **CTA** | Call to action | "Stop losing leads. Start closing them." |
| 10 | **Lockup** | Brand close | Logo + tagline + URL |

## Reusable Animation Components

These components exist in each client folder and are ready to copy:

| Component | What it does |
|-----------|-------------|
| `AnimatedLine` | SVG path that draws itself (stroke-dashoffset) |
| `PulseRing` | Expanding radar/sonar rings from a point |
| `AnimatedBar` | Horizontal percentage bar that fills |
| `AnimatedGraph` | Self-drawing line chart (up/down trends) |
| `ParticleField` | Floating connected dots (constellation effect) |
| `ChannelIcon` | Icon in glowing container with spring-in |
| `StatCounter` | Animated number 0→N with glow |
| `NeonGlowText` | Large text with pulsing neon glow |
| `WordReveal` | Word-by-word spring animation with highlights |
| `GlowOrb` | Floating gradient orb (background decoration) |
| `circuitPath` | Generates right-angle circuit board SVG paths |

## Skills Used

### remotion (at `~/.claude/skills/remotion/`)
Expert guide for Remotion APIs — useCurrentFrame, interpolate, spring, Sequence, Series, AbsoluteFill, staticFile, Audio, Img, and all rendering patterns.

### nano-banana (at `~/.claude/skills/nano-banana/`)
Image generation via Google Gemini API. Supports text-to-image and image editing. **Always use `-m gemini-3.1-flash-image-preview`** for all image generation in this project. Aspect ratios: 1:1, 16:9, 9:16, etc.

## Environment

- **API Key**: `GOOGLE_AI_API_KEY` in `~/.env` — required for Gemini image generation
- **Node.js**: v18+ required
- **Python 3**: Required for the nano-banana image generation script
- **Chrome Headless**: Auto-downloaded by Remotion on first render

## Key Conventions

- All videos: **1920x1080 @ 30fps**, H.264 codec, CRF 16
- All assets go in `public/<client>/`
- All source in `src/<client>/`
- Use `type` not `interface` for props (Remotion convention)
- Use `random('seed')` not `Math.random()` (deterministic rendering)
- Use `<Img>` not `<img>`, `staticFile()` not hardcoded paths
- Use `extrapolateRight: 'clamp'` on all `interpolate()` calls
- Always pass `fps` from `useVideoConfig()` to `spring()`
