import create from 'zustand';

type MapState = {
  selectedTrap: number | null;
  setSelectedTrap: (id: number) => void;
};

export const useMapState = create<MapState>((set, get) => ({
  selectedTrap: null,
  setSelectedTrap: id => set({selectedTrap: id}),
}));
