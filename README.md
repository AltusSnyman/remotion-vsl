# AI Video Factory

Generate cinematic marketing videos programmatically from a voiceover MP3 and a brand URL. Built with **Remotion** (React video framework), **Google Gemini** (AI image generation), and **Claude Code** (AI orchestration).

## What This Does

Drop in an MP3 voiceover + provide a website URL, and the system:

1. **Transcribes** the audio with frame-precise timestamps
2. **Researches** the brand website for colors, fonts, and messaging
3. **Generates** all visual assets (icons, logos, backgrounds) using Gemini AI
4. **Builds** a 10-scene animated video synced to the voiceover
5. **Renders** a production-ready 1080p MP4

Each video follows the **PAS (Problem-Agitate-Solution)** marketing framework — proven to convert.

## Example Videos

| Client | Duration | Composition ID |
|--------|----------|----------------|
| LVL2 | 102s | `LVL2Intro` |
| System Pros AI | 96s | `SystemProsIntro` |
| GHL WhatsApp Widget | 30s | `GHLWhatsAppOpener` |

## Prerequisites

- **Node.js** v18+ ([install](https://nodejs.org/))
- **Python 3** ([install](https://www.python.org/)) — for AI image generation
- **Google AI API Key** — for Gemini image generation ([get one](https://aistudio.google.com/apikey))
- **Claude Code** — for AI orchestration ([install](https://docs.anthropic.com/en/docs/claude-code))

## Quick Start

### 1. Clone and Install

```bash
git clone <repo-url>
cd remotion
npm install
```

### 2. Set Up Environment

Copy the example env file and add your Google AI API key:

```bash
cp .env.example .env
```

Edit `.env` and replace the placeholder:

```
GOOGLE_AI_API_KEY=your_actual_api_key_here
```

This key is used by the **nano-banana** skill to generate images via Google's Gemini API. Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

### 3. Install Claude Code Skills

The project uses two custom skills that must be installed in your Claude Code environment:

```bash
# Copy skills to your Claude skills directory
cp -r skills/remotion ~/.claude/skills/remotion
cp -r skills/nano-banana ~/.claude/skills/nano-banana
```

### 4. Preview in Studio

```bash
npm run dev
# Opens Remotion Studio at http://localhost:3000
```

### 5. Render a Video

```bash
# Render a specific composition
npx remotion render LVL2Intro out/lvl2-intro.mp4 --codec h264 --crf 16

# Render all compositions
npx remotion render SystemProsIntro out/systempros.mp4
npx remotion render GHLWhatsAppOpener out/opener.mp4
```

## Creating a New Client Video

### 1. Record the Voiceover

Use [11 Labs](https://elevenlabs.io/) or any TTS service. The standard script follows this structure:

```
"$126,000. That's how much the average business loses every year
from missed calls and unanswered messages..."
[pain stats -> agitate -> tease -> brand reveal -> channels -> stats -> before/after -> CTA -> lockup]
```

Save the MP3 to `public/<client>/voiceover.mp3`.

### 2. Ask Claude Code

Open Claude Code in this project directory and say:

```
I have a new voiceover at public/<client>/voiceover.mp3
for a business called [NAME] at [URL].
Transcribe it, research the brand, generate images,
and build the video.
```

Claude will use the skills and CLAUDE.md instructions to handle the entire pipeline.

### 3. Preview and Iterate

```bash
# Preview specific frames
npx remotion still ClientIntro --frame 500 out/preview.png

# Full render
npx remotion render ClientIntro out/client-video.mp4 --codec h264 --crf 16
```

## Project Structure

```
remotion/
├── CLAUDE.md                    # AI instructions for the full workflow
├── README.md                    # This file
├── .env.example                 # Environment template (copy to .env)
├── package.json                 # Node.js dependencies
├── remotion.config.ts           # Remotion output settings
├── tsconfig.json                # TypeScript config
│
├── skills/                      # Claude Code skills (copy to ~/.claude/skills/)
│   ├── remotion/                # Remotion development guide
│   │   └── SKILL.md
│   └── nano-banana/             # Gemini image generation
│       ├── SKILL.md
│       └── scripts/
│           └── generate_image.py
│
├── src/
│   ├── index.ts                 # Remotion entry point
│   ├── Root.tsx                 # Composition registry
│   │
│   ├── lvl2/                    # LVL2 client video (102s)
│   │   ├── LVL2Intro.tsx        # Main composition with <Audio> + <Sequence>
│   │   ├── constants.ts         # Brand colors
│   │   ├── Scene01_Hook.tsx     # "$126,000 Lost Per Year"
│   │   ├── Scene02_Pain.tsx     # "62%... 85%... competitor"
│   │   ├── Scene03_Agitate.tsx  # "While you sleep..."
│   │   ├── Scene04_Tease.tsx    # "What if you never missed..."
│   │   ├── Scene05_BrandReveal.tsx  # Flash -> logo -> brand name
│   │   ├── Scene06_Channels.tsx # 6 channel icons
│   │   ├── Scene07_Stats.tsx    # Animated counters
│   │   ├── Scene08_BeforeAfter.tsx  # AI before/after human
│   │   ├── Scene09_CTA.tsx      # "Stop losing leads"
│   │   ├── Scene10_Lockup.tsx   # Final brand card
│   │   └── [animation components...]
│   │
│   ├── systempros/              # System Pros AI video (96s)
│   │   └── [same structure as lvl2/]
│   │
│   └── opener/                  # GHL WhatsApp opener (30s)
│       └── [7 scene files]
│
├── public/
│   ├── lvl2/                    # LVL2 assets (voiceover + generated images)
│   ├── systempros/              # System Pros AI assets
│   └── opener/                  # GHL opener assets
│
└── out/                         # Rendered videos (gitignored)
```

## Animation Components

Each client folder includes these reusable components:

| Component | Effect |
|-----------|--------|
| `WordReveal` | Words appear one-by-one with spring bounce + color highlights |
| `NeonGlowText` | Large text with pulsing neon text-shadow |
| `AnimatedLine` | SVG paths that draw themselves (stroke-dashoffset) |
| `PulseRing` | Expanding radar rings from a point |
| `AnimatedBar` | Horizontal bar that fills to a percentage |
| `AnimatedGraph` | Self-drawing line chart with gradient fill |
| `ParticleField` | Floating dots connected by faint lines |
| `StatCounter` | Animated number counter (0 -> 97%) |
| `ChannelIcon` | Icon in glowing container with spring scale-in |
| `GlowOrb` | Floating gradient orb for background atmosphere |
| `circuitPath` | Generates circuit-board-style SVG path strings |

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Remotion](https://remotion.dev) | React-based programmatic video rendering |
| [Google Gemini](https://ai.google.dev) | AI image generation (icons, logos, backgrounds) |
| [11 Labs](https://elevenlabs.io) | AI voiceover generation |
| [Claude Code](https://claude.com/claude-code) | AI orchestration of the full pipeline |
| React 19 | Component framework |
| TypeScript 5 | Type safety |

## CLI Commands

```bash
npm run dev                  # Start Remotion Studio (visual editor)
npm run build                # Bundle for deployment
npm run lint                 # ESLint + TypeScript check
npx remotion compositions    # List all registered compositions
npx remotion render <id>     # Render a composition to MP4
npx remotion still <id>      # Render a single frame to PNG
npx remotion upgrade         # Upgrade Remotion packages
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_AI_API_KEY` | Yes | Google AI Studio API key for Gemini image generation |

The nano-banana image generation script checks for this key in:
1. `./.env` (project root)
2. `~/wood1/.env`
3. `~/.env`

## License

UNLICENSED — Private project.
