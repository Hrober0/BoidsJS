import { useEffect, useRef } from 'react';
import useFullScreenCanvas from './hooks/useFullScreenCanvas.ts';
import useMousePosition from './hooks/useMousePosition.ts';
import { drawBoids } from './methods/drawing.ts';
import { pushBoids, updatePositions } from './methods/movement.ts';
import { spatialHash } from './methods/spatialHash.ts';
import type { Boid } from './types.ts';

export default function BoidsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFullScreenCanvas(canvasRef);

  const mousePosition = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const { build, query } = spatialHash<Boid>(canvas.width, canvas.height, 60);

    // --- CREATE BOIDS ---
    const boids: Boid[] = [];
    const BOIDS_COUNT = 500;
    for (let i = 0; i < BOIDS_COUNT; i++) {
      boids.push({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        velocity: {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
        },
      });
    }

    function loop() {
      build(boids);
      pushBoids(mousePosition, query, 100, .2);
      updatePositions(boids, canvas.width, canvas.height, 1);
      drawBoids(boids, ctx);
      requestAnimationFrame(loop);
    }

    loop();
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
