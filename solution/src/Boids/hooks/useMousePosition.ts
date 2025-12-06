import { useEffect, useRef } from 'react';

export default function useMousePosition() {
  const mouse = useRef({ x: 1, y: 1 });
  useEffect(() => {
    function updatePosition(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    window.addEventListener('mousemove', updatePosition);
    return () => window.addEventListener('mousemove', updatePosition);
  }, []);
  return mouse.current!;
}
