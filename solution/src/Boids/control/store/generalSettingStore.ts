import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GenericSettings {
  numberOfBoids: number;
  speed: number;
  setNumberOfBoids: (n: number) => void;
  setSpeed: (n: number) => void;
  reset: () => void;
}

const DEFAULT_SPEED = 1;
const MAX_BOIDS = 1000;
const BOIDS_PIXEL = 1000;

export const useGeneralSettingStore = create<GenericSettings>()(
  persist(
    (set) => ({
      numberOfBoids: calculateBoidsNumberBaseOnScree(),
      speed: DEFAULT_SPEED,
      setNumberOfBoids: (numberOfBoids: number) => set({ numberOfBoids }),
      setSpeed: (speed: number) => set({ speed }),
      reset: () => {
        set({
          numberOfBoids: calculateBoidsNumberBaseOnScree(),
          speed: DEFAULT_SPEED,
        });
      },
    }),
    {
      name: 'boids-separation',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

function calculateBoidsNumberBaseOnScree(): number {
  return Math.min(
    MAX_BOIDS,
    (window.innerWidth * window.innerHeight) / BOIDS_PIXEL,
  );
}
