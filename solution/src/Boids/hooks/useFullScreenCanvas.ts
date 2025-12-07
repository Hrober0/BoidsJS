import { type RefObject, useEffect } from 'react';

export default function useFullScreenCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef]);
}
