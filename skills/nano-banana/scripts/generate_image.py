#!/usr/bin/env python3
"""Generate images using Google Gemini API (Imagen / Nano Banana 2)."""

import argparse
import base64
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime


def load_api_key():
    """Load API key from .env files in common locations."""
    env_paths = [
        Path.cwd() / ".env",
        Path.home() / "wood1" / ".env",
        Path.home() / ".env",
    ]
    for env_path in env_paths:
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                line = line.strip()
                if line.startswith("#") or "=" not in line:
                    continue
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key == "GOOGLE_AI_API_KEY":
                    return val
    return os.environ.get("GOOGLE_AI_API_KEY")


def encode_image(image_path):
    """Read and base64-encode an image file."""
    path = Path(image_path)
    if not path.exists():
        print(f"Error: Image file not found: {image_path}", file=sys.stderr)
        sys.exit(1)

    ext = path.suffix.lower()
    mime_map = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }
    mime_type = mime_map.get(ext, "image/png")
    data = base64.standard_b64encode(path.read_bytes()).decode("utf-8")
    return mime_type, data


def generate_image(
    prompt,
    model="gemini-3.1-flash-image-preview",
    output_path=None,
    input_image=None,
    aspect_ratio=None,
    image_size=None,
):
    """Call Gemini API to generate an image."""
    api_key = load_api_key()
    if not api_key:
        print("Error: GOOGLE_AI_API_KEY not found in .env or environment.", file=sys.stderr)
        sys.exit(1)

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    # Build parts
    parts = []

    # Add input image if provided (for editing)
    if input_image:
        mime_type, img_data = encode_image(input_image)
        parts.append({
            "inlineData": {
                "mimeType": mime_type,
                "data": img_data,
            }
        })

    parts.append({"text": prompt})

    # Build generation config
    generation_config = {
        "responseModalities": ["TEXT", "IMAGE"],
    }

    image_config = {}
    if aspect_ratio:
        image_config["aspectRatio"] = aspect_ratio
    if image_size:
        image_config["imageSize"] = image_size
    if image_config:
        generation_config["imageConfig"] = image_config

    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": generation_config,
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        print(f"API Error {e.code}: {error_body}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Network error: {e.reason}", file=sys.stderr)
        sys.exit(1)

    # Process response
    candidates = result.get("candidates", [])
    if not candidates:
        print("Error: No candidates in response.", file=sys.stderr)
        print(json.dumps(result, indent=2), file=sys.stderr)
        sys.exit(1)

    content = candidates[0].get("content", {})
    parts_out = content.get("parts", [])

    text_parts = []
    image_saved = False

    for part in parts_out:
        if "text" in part:
            text_parts.append(part["text"])
        elif "inlineData" in part:
            inline = part["inlineData"]
            img_bytes = base64.standard_b64decode(inline["data"])
            mime = inline.get("mimeType", "image/png")

            ext = ".png"
            if "jpeg" in mime or "jpg" in mime:
                ext = ".jpg"
            elif "webp" in mime:
                ext = ".webp"

            if not output_path:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                output_path = str(Path.cwd() / f"generated_{timestamp}{ext}")

            out = Path(output_path)
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(img_bytes)
            print(f"Image saved to: {out.resolve()}")
            image_saved = True

    if text_parts:
        print("\nModel response text:")
        print("\n".join(text_parts))

    if not image_saved:
        print("Warning: No image was returned by the API.", file=sys.stderr)
        print("Full response:", file=sys.stderr)
        print(json.dumps(result, indent=2), file=sys.stderr)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Generate images with Gemini API")
    parser.add_argument("prompt", help="Text prompt for image generation")
    parser.add_argument("-o", "--output", help="Output file path (default: generated_<timestamp>.png)")
    parser.add_argument("-i", "--input-image", help="Input image path for editing")
    parser.add_argument("-m", "--model", default="gemini-3.1-flash-image-preview",
                        help="Model name (default: gemini-3.1-flash-image-preview)")
    parser.add_argument("-a", "--aspect-ratio", choices=["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"],
                        help="Aspect ratio for generated image")
    parser.add_argument("-s", "--size", choices=["512", "1K", "2K", "4K"],
                        help="Image size/resolution")

    args = parser.parse_args()

    generate_image(
        prompt=args.prompt,
        model=args.model,
        output_path=args.output,
        input_image=args.input_image,
        aspect_ratio=args.aspect_ratio,
        image_size=args.size,
    )


if __name__ == "__main__":
    main()
