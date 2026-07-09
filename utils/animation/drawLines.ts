import { Circle } from "./particles";

export function drawLinesBtwnParticles(
  ctx: CanvasRenderingContext2D,
  circles: Circle[],
  canvasHeight: number,
  canvasWidth: number
): void {
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const a = circles[i];
      const b = circles[j];

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = (canvasWidth / 77 ) * (canvasHeight / 77)
      if (distance < maxDistance) {
        let opacity = 1 - (distance / maxDistance);
        opacity = Math.max(0, Math.min(1, opacity)); // always clamp

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(91, 91, 92, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}
