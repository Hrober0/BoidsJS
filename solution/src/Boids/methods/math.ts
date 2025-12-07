import type { Vector2 } from '../types';

export function calcMagnitudeOf(vector: Vector2) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function vectorDiff(target: Vector2, origin: Vector2) {
  return {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };
}

export function normalizeVector(vector: Vector2) {
  const length = calcMagnitudeOf(vector);

  if (length === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: vector.x / length,
    y: vector.y / length,
  };
}
