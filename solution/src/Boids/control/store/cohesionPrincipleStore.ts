import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const DEFAULT_COHESION_RANGE = 50;
const DEFAULT_COHESION_INFLUENCE = 0.04;

type CohesionPrincipleState = {
  cohesionRange: number;
  cohesionInfluence: number;
  setCohesionRange: (range: number) => void;
  setCohesionInfluence: (influence: number) => void;
};

export const useCohesionPrincipleStore = create<CohesionPrincipleState>()(
  persist(
    (set) => ({
      cohesionRange: DEFAULT_COHESION_RANGE,
      cohesionInfluence: DEFAULT_COHESION_INFLUENCE,
      setCohesionRange: (range) => set({ cohesionRange: range }),
      setCohesionInfluence: (influence) =>
        set({ cohesionInfluence: influence }),
    }),
    {
      name: 'boids-cohesion',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
