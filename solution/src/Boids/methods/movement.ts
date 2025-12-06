import type { Boid, Vector2 } from '../types.ts';
import { magnitude } from './math.ts';
import type { QueryMethod } from './spatialHash.ts';

export function updatePositions(
  boids: Boid[],
  canvasWidth: number,
  canvasHeight: number,
  targetSpeed: number,
  speedNormalization: number = .1,
) {
  for (let i = 0; i < boids.length; i++) {
    const b = boids[i];

    const speed = magnitude(b.velocity.x, b.velocity.y);
    const targetVelocity = {
      x: b.velocity.x / speed * targetSpeed,
      y: b.velocity.y / speed * targetSpeed,
    }

    b.velocity.x += (targetVelocity.x - b.velocity.x) * speedNormalization;
    b.velocity.y += (targetVelocity.y - b.velocity.y) * speedNormalization;

    b.position.x += b.velocity.x;
    b.position.y += b.velocity.y;

    // wrap screen x
    if (b.position.x < 0) b.position.x += canvasWidth;
    else if (b.position.x > canvasWidth) b.position.x -= canvasWidth;

    // wrap screen y
    if (b.position.y < 0) b.position.y += canvasHeight;
    else if (b.position.y > canvasHeight) b.position.y -= canvasHeight;
  }
}

export function pushBoids(
  position: Vector2,
  query: QueryMethod<Boid>,
  range: number,
  influence: number = 0.1,
) {
  query(position, range, (boid) => {
    const difX = boid.position.x - position.x;
    const difY = boid.position.y - position.y;
    const length = magnitude(difX, difY);
    if (length == 0 || length > range) return;

    boid.velocity.x += (difX / length) * influence;
    boid.velocity.y += (difY / length) * influence;
  });
}
