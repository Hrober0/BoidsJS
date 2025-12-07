import type { Boid, Vector2 } from '../types.ts';
import { calcMagnitudeOf, normalizeVector, vectorDiff } from './math.ts';
import type { QueryMethod } from './spatialHash.ts';

export function adjustVelocities(
  boids: Boid[],
  targetSpeed: number,
  speedNormalization: number = 0.1,
) {
  for (let i = 0; i < boids.length; i++) {
    const b = boids[i];

    const speed = calcMagnitudeOf(b.velocity);
    const targetVelocity = {
      x: (b.velocity.x / speed) * targetSpeed,
      y: (b.velocity.y / speed) * targetSpeed,
    };

    b.velocity.x += (targetVelocity.x - b.velocity.x) * speedNormalization;
    b.velocity.y += (targetVelocity.y - b.velocity.y) * speedNormalization;
  }
}

export function moveAndWrap(
  boids: Boid[],
  canvasWidth: number,
  canvasHeight: number,
) {
  for (let i = 0; i < boids.length; i++) {
    const b = boids[i];

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

export function pushAwayBoids(
  position: Vector2,
  query: QueryMethod<Boid>,
  range: number,
  influence: number = 0.2,
) {
  query(position, range, (boid) => {
    const difVector = vectorDiff(boid.position, position);

    if (calcMagnitudeOf(difVector) > range) {
      return;
    }

    const normalizedDifVector = normalizeVector(difVector);
    boid.velocity.x += normalizedDifVector.x * influence;
    boid.velocity.y += normalizedDifVector.y * influence;
  });
}

export function applySeparationPrinciple(
  boids: Boid[],
  query: QueryMethod<Boid>,
  separtion_range: number = 35,
  influence: number = 0.6,
) {
  for (const boid of boids) {
    let steerX = 0;
    let steerY = 0;

    query(boid.position, separtion_range, (neighbourBoid) => {
      if (boid === neighbourBoid) {
        return;
      }

      const difVector = vectorDiff(boid.position, neighbourBoid.position);
      const distance = calcMagnitudeOf(difVector);

      if (distance === 0 || distance > separtion_range) {
        return;
      }

      const normalizedDifVector = normalizeVector(difVector);
      const factor = 1 / distance;

      steerX += normalizedDifVector.x * factor;
      steerY += normalizedDifVector.y * factor;
    });

    boid.velocity.x += steerX * influence;
    boid.velocity.y += steerY * influence;
  }
}

export function applyCohesionPrinciple(
  boids: Boid[],
  query: QueryMethod<Boid>,
  cohesionRange: number = 50,
  influence: number = 0.04,
) {
  for (const boid of boids) {
    let sumX = 0;
    let sumY = 0;
    let count = 0;

    query(boid.position, cohesionRange, (neighbourBoid) => {
      if (boid === neighbourBoid) return;

      // ensure proper range since spatial hash might return some out of range boids
      if (
        calcMagnitudeOf(vectorDiff(boid.position, neighbourBoid.position)) >
        cohesionRange
      ) {
        return;
      }

      sumX += neighbourBoid.position.x;
      sumY += neighbourBoid.position.y;
      count++;
    });

    if (count === 0) {
      continue;
    }

    // COM - Center of Mass
    const com: Vector2 = {
      x: sumX / count,
      y: sumY / count,
    };
    const directionToCom = vectorDiff(com, boid.position);
    const normalizedDirectionToCom = normalizeVector(directionToCom);

    boid.velocity.x += normalizedDirectionToCom.x * influence;
    boid.velocity.y += normalizedDirectionToCom.y * influence;
  }
}

export function applyAlignmentPrinciple(
  boids: Boid[],
  query: QueryMethod<Boid>,
  allignmentRange: number = 50,
  influence: number = 0.04,
) {
  for (const boid of boids) {
    let sumVX = 0;
    let sumVY = 0;
    let count = 0;

    query(boid.position, allignmentRange, (neighbourBoid) => {
      if (boid === neighbourBoid) return;

      if (
        calcMagnitudeOf(vectorDiff(boid.position, neighbourBoid.position)) >
        allignmentRange
      ) {
        return;
      }

      sumVX += neighbourBoid.velocity.x;
      sumVY += neighbourBoid.velocity.y;
      count++;
    });

    if (count === 0) {
      continue;
    }

    const avgVelocity: Vector2 = {
      x: sumVX / count,
      y: sumVY / count,
    };
    const normalizedAvgVelocity = normalizeVector(avgVelocity);

    boid.velocity.x += normalizedAvgVelocity.x * influence;
    boid.velocity.y += normalizedAvgVelocity.y * influence;
  }
}
