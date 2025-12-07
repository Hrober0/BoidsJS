import type { Boid, Vector2 } from '../types.ts';

const BOID_SIZE = 8;
const BODY_LENGTH = BOID_SIZE * 1.5;
const BODY_HEIGHT = BOID_SIZE;

export const FISH_COLORS = [
  {
    bodyColor: 'rgba(100, 165, 255, 0.9)',
    accentColor: 'rgba(60, 120, 210, 0.9)',
  },
  {
    bodyColor: 'rgba(255, 185, 120, 0.9)',
    accentColor: 'rgba(230, 150, 90, 0.9)',
  },
  {
    bodyColor: 'rgba(195, 165, 255, 0.9)',
    accentColor: 'rgba(160, 135, 230, 0.9)',
  },
];

export function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawBoids(boids: Boid[], ctx: CanvasRenderingContext2D) {
  boids.forEach((boid) => drawBoid(boid, ctx));
}

function drawBoid(boid: Boid, ctx: CanvasRenderingContext2D) {
  ctx.save();

  rotateBoid(boid, ctx);
  drawBody(boid, ctx);
  drawFinAtTheTop(boid, ctx);
  drawTail(boid, ctx);
  drawEye(ctx);

  ctx.restore();
}

function rotateBoid(boid: Boid, ctx: CanvasRenderingContext2D) {
  const angle = Math.atan2(boid.velocity.y, boid.velocity.x);
  ctx.translate(boid.position.x, boid.position.y);
  ctx.rotate(angle);
}

function drawBody(boid: Boid, ctx: CanvasRenderingContext2D) {
  const { bodyColor } = FISH_COLORS[boid.colorIndex];

  ctx.beginPath();
  ctx.ellipse(0, 0, BODY_LENGTH * 0.8, BODY_HEIGHT * 0.8, 0, 0, Math.PI * 2);
  ctx.fillStyle = bodyColor;
  ctx.fill();
}

function drawFinAtTheTop(boid: Boid, ctx: CanvasRenderingContext2D) {
  const { accentColor } = FISH_COLORS[boid.colorIndex];

  ctx.beginPath();
  ctx.moveTo(-BODY_LENGTH * 0.3, -BODY_HEIGHT * 0.55);
  ctx.quadraticCurveTo(
    0,
    -BODY_HEIGHT * 1.35,
    BODY_LENGTH * 0.3,
    -BODY_HEIGHT * 0.55,
  );
  ctx.closePath();
  ctx.fillStyle = accentColor;
  ctx.fill();
}

function drawTail(boid: Boid, ctx: CanvasRenderingContext2D) {
  const { accentColor } = FISH_COLORS[boid.colorIndex];

  ctx.beginPath();
  ctx.moveTo(-BODY_LENGTH * 0.8, 0);
  ctx.lineTo(-BODY_LENGTH * 1.35, BODY_HEIGHT * 0.8);
  ctx.lineTo(-BODY_LENGTH * 1.35, -BODY_HEIGHT * 0.8);
  ctx.closePath();
  ctx.fillStyle = accentColor;
  ctx.fill();
}

function drawEye(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.arc(BODY_LENGTH * 0.6, -BODY_HEIGHT * 0.08, 2, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(BODY_LENGTH * 0.65, -BODY_HEIGHT * 0.08, 1, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();
}

export function drawDangerZone(
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
