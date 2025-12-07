import type { Boid, Vector2 } from '../types.ts';

const BOID_SIZE = 8;
const BOID_HALF_WIDTH = 4;

export function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawBoids(boids: Boid[], ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgba(100,100,100,0.6)';

  boids.forEach((b) => {
    const angle = Math.atan2(b.velocity.y, b.velocity.x);
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(BOID_SIZE, 0);
    ctx.lineTo(-BOID_SIZE * 0.4, BOID_HALF_WIDTH);
    ctx.lineTo(-BOID_SIZE * 0.4, -BOID_HALF_WIDTH);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  });
}

export function drawCursorInfluence(
  ctx: CanvasRenderingContext2D,
  position: Vector2,
  range: number,
) {
  ctx.beginPath();

  ctx.arc(position.x, position.y, range, 0, Math.PI * 2);
  ctx.fillStyle = createDangerZoneGradient(ctx, position, range);
  ctx.fill();
}

const createDangerZoneGradient = (
  ctx: CanvasRenderingContext2D,
  position: Vector2,
  range: number,
) => {
  const gradient = ctx.createRadialGradient(
    position.x,
    position.y,
    range * 0.2,
    position.x,
    position.y,
    range,
  );

  gradient.addColorStop(0, 'rgba(255, 0, 0, 0.45)');
  gradient.addColorStop(0.4, 'rgba(255, 0, 0, 0.30)');
  gradient.addColorStop(0.7, 'rgba(255, 0, 0, 0.18)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.06)');

  return gradient;
};
