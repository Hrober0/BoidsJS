import { useEffect, useState } from 'react';
import useFullScreenCanvas from './useFullScreenCanvas';

export function useCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useFullScreenCanvas(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setCtx(canvas.getContext('2d'));
  }, [canvasRef]);

  return {
    ctx,
    width: canvasRef.current?.width ?? 0,
    height: canvasRef.current?.height ?? 0,
  };
}
