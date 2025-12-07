import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { PrincipleState } from './PrincipleState';

const DEFAULT_COHESION_RANGE = 50;
const DEFAULT_COHESION_INFLUENCE = 0.04;

export const useCohesionPrincipleStore = create<PrincipleState>()(
  persist(
    (set) => ({
      range: DEFAULT_COHESION_RANGE,
      influence: DEFAULT_COHESION_INFLUENCE,
      setRange: (range) => set({ range }),
      setInfluence: (influence) => set({ influence }),
      reset: () => {
        set({
          range: DEFAULT_COHESION_RANGE,
          influence: DEFAULT_COHESION_INFLUENCE,
        });
      },
    }),
    {
      name: 'boids-cohesion',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
