import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const DEFAULT_ALIGNMENT_RANGE = 50;
const DEFAULT_ALIGNMENT_INFLUENCE = 0.04;

type AlignmentPrincipleState = {
  alignmentRange: number;
  alignmentInfluence: number;
  setAlignmentRange: (range: number) => void;
  setAlignmentInfluence: (influence: number) => void;
};

export const useAlignmentPrincipleStore = create<AlignmentPrincipleState>()(
  persist(
    (set) => ({
      alignmentRange: DEFAULT_ALIGNMENT_RANGE,
      alignmentInfluence: DEFAULT_ALIGNMENT_INFLUENCE,
      setAlignmentRange: (range) => set({ alignmentRange: range }),
      setAlignmentInfluence: (influence) =>
        set({ alignmentInfluence: influence }),
    }),
    {
      name: 'boids-alignment',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
