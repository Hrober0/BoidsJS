import { useEffect, useState } from 'react';

export default function useDangerZone() {
  const [isActive, setIsActive] = useState(false);

  const toggle = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      setIsActive((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', toggle);
    return () => window.removeEventListener('keydown', toggle);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('danger-mode', isActive);
  }, [isActive]);

  return { isActive };
}
