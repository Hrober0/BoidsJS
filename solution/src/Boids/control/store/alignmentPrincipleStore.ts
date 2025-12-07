import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { PrincipleStore } from './PrincipleStore';

const DEFAULT_ALIGNMENT_RANGE = 50;
const DEFAULT_ALIGNMENT_INFLUENCE = 0.04;

export const useAlignmentPrincipleStore = create<PrincipleStore>()(
  persist(
    (set) => ({
      range: DEFAULT_ALIGNMENT_RANGE,
      influence: DEFAULT_ALIGNMENT_INFLUENCE,
      setRange: (range) => set({ range }),
      setInfluence: (influence) => set({ influence }),
      reset: () => {
        set({
          range: DEFAULT_ALIGNMENT_RANGE,
          influence: DEFAULT_ALIGNMENT_INFLUENCE,
        });
      },
    }),
    {
      name: 'boids-alignment',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
