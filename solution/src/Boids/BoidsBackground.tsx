import { useEffect, useRef } from 'react';
import { useCanvas } from './hooks/useCanvas.ts';
import useDangerZone from './hooks/useDangerZone.ts';
import useMousePosition from './hooks/useMousePosition.ts';
import {
  clearCanvas,
  drawBoids,
  drawCursorInfluence,
  FISH_COLORS,
} from './methods/drawing.ts';
import {
  adjustVelocities,
  applyCohesionPrinciple,
  applySeparationPrinciple,
  moveAndWrap,
  pushAwayBoids,
} from './methods/movement.ts';
import { spatialHash } from './methods/spatialHash.ts';
import type { Boid } from './types.ts';

export default function BoidsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ctx, width, height } = useCanvas(canvasRef);

  const mousePosition = useMousePosition();
  const { isActive: dangerModeActive } = useDangerZone();

  const boidsRef = useRef<Boid[]>([]);
  const mousePositionRef = useRef(mousePosition);
  const dangerModeRef = useRef(dangerModeActive);

  useEffect(() => {
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    dangerModeRef.current = dangerModeActive;
  }, [dangerModeActive]);

  // --- CREATE BOIDS ---
  useEffect(() => {
    if (!ctx) return;

    const boids: Boid[] = [];
    const BOIDS_COUNT = 500;
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
  }, [ctx, width, height]);

  // --- ANIMATION LOOP ---
  useEffect(() => {
    if (!ctx) return;
    if (!boidsRef.current.length) return;

    const { build, query } = spatialHash<Boid>(width, height, 60);
    const ctxForDraw = ctx;
    let frameId: number;

    function loop() {
      const boids = boidsRef.current;
      const mousePosition = mousePositionRef.current;
      const dangerModeActive = dangerModeRef.current;

      clearCanvas(ctxForDraw);
      build(boids);

      if (dangerModeActive) {
        const dangerZoneRange = 100;
        drawCursorInfluence(ctxForDraw, mousePosition, dangerZoneRange);
        pushAwayBoids(mousePosition, query, dangerZoneRange);
      }

      applySeparationPrinciple(boids, query);
      applyCohesionPrinciple(boids, query);

      adjustVelocities(boids, 1);
      moveAndWrap(boids, width, height);

      drawBoids(boids, ctxForDraw);
      frameId = requestAnimationFrame(loop);
    }

    loop();

    return () => cancelAnimationFrame(frameId);
  }, [ctx, width, height, dangerModeRef, mousePositionRef]);

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
