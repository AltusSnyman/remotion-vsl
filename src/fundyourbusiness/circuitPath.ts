import { random } from 'remotion';

export function circuitPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  turns: number = 3,
  seed: string = 'circuit',
): string {
  const segments: string[] = [`M ${startX} ${startY}`];
  const horizontal = Math.abs(endX - startX) > Math.abs(endY - startY);

  for (let i = 0; i < turns; i++) {
    const t = (i + 1) / (turns + 1);
    const r = random(`${seed}-${i}`);

    if ((i % 2 === 0) === horizontal) {
      const targetX = startX + (endX - startX) * t + (r - 0.5) * 100;
      segments.push(`H ${Math.round(targetX)}`);
    } else {
      const targetY = startY + (endY - startY) * t + (r - 0.5) * 80;
      segments.push(`V ${Math.round(targetY)}`);
    }
  }

  if (horizontal) {
    segments.push(`V ${Math.round(endY)}`);
    segments.push(`H ${Math.round(endX)}`);
  } else {
    segments.push(`H ${Math.round(endX)}`);
    segments.push(`V ${Math.round(endY)}`);
  }

  return segments.join(' ');
}
