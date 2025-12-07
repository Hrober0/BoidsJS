import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { PrincipleStore } from './PrincipleStore';

const DEFAULT_SEPARATION_RANGE = 35;
const DEFAULT_SEPARATION_INFLUENCE = 0.7;

export const useSeparationPrincipleStore = create<PrincipleStore>()(
  persist(
    (set) => ({
      range: DEFAULT_SEPARATION_RANGE,
      influence: DEFAULT_SEPARATION_INFLUENCE,
      setRange: (range) => set({ range }),
      setInfluence: (influence) => set({ influence }),
      reset: () => {
        set({
          range: DEFAULT_SEPARATION_RANGE,
          influence: DEFAULT_SEPARATION_INFLUENCE,
        });
      },
    }),
    {
      name: 'boids-separation',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
