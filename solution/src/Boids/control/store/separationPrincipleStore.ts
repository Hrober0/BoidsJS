import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const DEFAULT_SEPARATION_RANGE = 35;
const DEFAULT_SEPARATION_INFLUENCE = 0.6;

type SeparationPrincipleState = {
  separationRange: number;
  separationInfluence: number;
  setSeparationRange: (range: number) => void;
  setSeparationInfluence: (influence: number) => void;
};

export const useSeparationPrincipleStore = create<SeparationPrincipleState>()(
  persist(
    (set) => ({
      separationRange: DEFAULT_SEPARATION_RANGE,
      separationInfluence: DEFAULT_SEPARATION_INFLUENCE,
      setSeparationRange: (range) => set({ separationRange: range }),
      setSeparationInfluence: (influence) =>
        set({ separationInfluence: influence }),
    }),
    {
      name: 'boids-separation',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
