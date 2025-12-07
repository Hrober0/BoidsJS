export type PrincipleStore = {
  range: number;
  influence: number;
  setRange: (range: number) => void;
  setInfluence: (influence: number) => void;
  reset: () => void;
};
