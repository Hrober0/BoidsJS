import type { Boid } from '../types.ts';

const BOID_SIZE = 8;
const BOID_HALF_WIDTH = 4;

export function drawBoids(boids: Boid[], ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'rgba(100,100,100,0.6)';

  boids.forEach((b) => {
    const angle = Math.atan2(b.velocity.y, b.velocity.x);
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(BOID_SIZE, 0);
    ctx.lineTo(-BOID_SIZE * .4, BOID_HALF_WIDTH);
    ctx.lineTo(-BOID_SIZE * .4, -BOID_HALF_WIDTH);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  });
}