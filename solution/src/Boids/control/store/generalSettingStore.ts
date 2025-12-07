import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GenericSettings {
  numberOfBoids: number;
  setNumberOfBoids: (n: number) => void;
  reset: () => void;
}

const MAX_BOIDS = 1000;
const BOIDS_PIXEL = 1000;

export const useGeneralSettingStore = create<GenericSettings>()(
  persist(
    (set) => ({
      numberOfBoids: calculateBoidsNumberBaseOnScree(),
      setNumberOfBoids: (numberOfBoids) => set({ numberOfBoids }),
      reset: () => {
        set({
          numberOfBoids: calculateBoidsNumberBaseOnScree(),
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
  return Math.min(MAX_BOIDS, (window.innerWidth * window.innerHeight) / BOIDS_PIXEL);
}
