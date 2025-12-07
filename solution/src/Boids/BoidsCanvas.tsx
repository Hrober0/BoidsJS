import { useEffect, useRef } from 'react';
import useDangerZone from './hooks/useDangerZone.ts';
import useMousePosition from './hooks/useMousePosition.ts';
import {
  clearCanvas,
  drawBoids,
  drawDangerZone,
  FISH_COLORS,
} from './methods/drawing.ts';
import {
  adjustVelocities,
  applyAlignmentPrinciple,
  applyCohesionPrinciple,
  applySeparationPrinciple,
  moveAndWrap,
  pushAwayBoids,
} from './methods/movement.ts';
import { spatialHash } from './methods/spatialHash.ts';
import type { Boid } from './types.ts';
import useFullScreenCanvas from './hooks/useFullScreenCanvas.ts';

export default function BoidsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ctx, width, height } = useFullScreenCanvas(canvasRef);

  const mousePosition = useMousePosition();
  const { isActive: dangerModeActive } = useDangerZone();

  const boidsRef = useRef<Boid[]>([]);

  // --- CREATE BOIDS ---
  useEffect(() => {
    if (!ctx) return;

    const boids: Boid[] = [];
    const BOIDS_COUNT = 800;
    for (let i = 0; i < BOIDS_COUNT; i++) {
      boids.push({
        position: {
          x: Math.random() * width,
          y: Math.random() * height,
        },
        velocity: {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
        },
        colorIndex: Math.floor(Math.random() * FISH_COLORS.length),
      });
    }

    boidsRef.current = boids;
  }, [ctx, height, width]);

  // --- ANIMATION LOOP ---
  useEffect(() => {
    if (!ctx) return;
    if (!boidsRef.current.length) return;

    const { build, query } = spatialHash<Boid>(width, height, 60);
    const ctxForDraw = ctx;
    let frameId: number;

    function loop() {
      const boids = boidsRef.current;

      clearCanvas(ctxForDraw);
      build(boids);

      if (dangerModeActive) {
        const dangerZoneRange = 100;
        drawDangerZone(ctxForDraw, mousePosition, dangerZoneRange);
        pushAwayBoids(mousePosition, query, dangerZoneRange);
      }

      applySeparationPrinciple(boids, query);
      applyCohesionPrinciple(boids, query);
      applyAlignmentPrinciple(boids, query);

      adjustVelocities(boids, 1);
      moveAndWrap(boids, width, height);

      drawBoids(boids, ctxForDraw);
      frameId = requestAnimationFrame(loop);
    }

    loop();

    return () => cancelAnimationFrame(frameId);
  }, [ctx, width, height, mousePosition, dangerModeActive]);

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
