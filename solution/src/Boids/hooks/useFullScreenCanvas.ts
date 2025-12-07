import { type RefObject, useEffect, useState } from 'react';

export default function useFullScreenCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setWidth(canvas.width);
        setHeight(canvas.height);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      setCtx(canvas.getContext('2d'));
    }
  }, [canvasRef]);

  return { ctx, width, height };
}
