---
name: nano-banana
description: Generate and edit images using Google Gemini's image generation API (Nano Banana 2). Use this skill whenever the user wants to create, generate, design, draw, or make an image, picture, illustration, artwork, graphic, photo, or visual. Also triggers for image editing tasks like "edit this image", "change the background", "add X to this photo", "remove Y from image". Triggers on phrases like "generate an image of", "create a picture", "make me an image", "draw", "design a logo", "nano banana", "imagen", "make a wallpaper", "generate art", "create artwork", "edit this photo", etc.
---

# Nano Banana 2 — Image Generation Skill

Generate and edit images using Google's Gemini image generation API.

## How to use

Run the bundled Python script:

```bash
python3 /home/altus/.claude/skills/nano-banana/scripts/generate_image.py "<prompt>"
```

### Options

| Flag | Description | Example |
|------|-------------|---------|
| `-o`, `--output` | Output file path | `-o /home/altus/my_image.png` |
| `-i`, `--input-image` | Input image for editing | `-i photo.jpg` |
| `-m`, `--model` | Model to use | `-m gemini-3.1-flash-image-preview` |
| `-a`, `--aspect-ratio` | Aspect ratio | `-a 16:9` |
| `-s`, `--size` | Resolution | `-s 2K` |

### Available Models

- `gemini-3.1-flash-image-preview` (preferred default) — Best quality for icons, logos, and assets
- `gemini-2.5-flash-image` — Fast, optimized for high-volume tasks and quick drafts
- `gemini-3-pro-image-preview` — Highest quality, best for professional assets

### Aspect Ratios

`1:1` (square), `16:9` (landscape), `9:16` (portrait/mobile), `4:3`, `3:4`, `3:2`, `2:3`

### Resolutions

`512` (fast preview), `1K`, `2K`, `4K` (highest quality)

## Generating Images (text-to-image)

For a simple generation, just pass the prompt:

```bash
python3 /home/altus/.claude/skills/nano-banana/scripts/generate_image.py "A serene mountain lake at sunset with reflections" -o landscape.png -a 16:9 -s 2K
```

Write detailed, descriptive prompts for best results. Include style, mood, lighting, composition, and subject details. For example instead of "a cat" try "a fluffy orange tabby cat sitting on a windowsill, golden hour lighting, watercolor style."

## Editing Images

Provide an input image plus editing instructions:

```bash
python3 /home/altus/.claude/skills/nano-banana/scripts/generate_image.py "Remove the background and replace with a beach sunset" -i input.jpg -o edited.png
```

The model can add, remove, or modify elements, change styles, adjust colors, and transform compositions.

## Credentials

The script loads `GOOGLE_AI_API_KEY` from `.env` files automatically. It checks these locations in order:
1. Current working directory `.env`
2. `/home/altus/wood1/.env`
3. `~/.env`

Or set the `GOOGLE_AI_API_KEY` environment variable directly.

## Output

- The script prints the saved file path on success
- Any text the model returns (descriptions, thoughts) is also printed
- On error, details are printed to stderr

## Tips for Great Results

- Be specific and descriptive in prompts — style, lighting, mood, composition all help
- Use `gemini-3.1-flash-image-preview` as the default for all generation — best balance of quality and speed
- Use `gemini-3-pro-image-preview` for highest quality professional work
- Use `gemini-2.5-flash-image` only for quick drafts when speed matters more than quality
- For logos and graphics, specify "clean vector style, white background"
- For photos, mention camera angle, lens type, and lighting
- Use the editing mode to iteratively refine — generate first, then edit to adjust
