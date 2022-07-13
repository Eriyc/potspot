import create from 'zustand';
import {persist} from 'zustand/middleware';
import * as storage from 'core/storage';
import {TrapFeatureType} from 'api/trap';
interface TrapCache {
  cached: TrapFeatureType[];
  updateCache: (traps: TrapFeatureType[]) => void;
  updatedAt: number;
}

export const useTrapCache = create<TrapCache>()(
  persist(
    set => ({
      cached: [],
      updatedAt: 0,
      updateCache: traps => set({cached: traps, updatedAt: Date.now()}),
    }),
    {
      name: 'trap-cache',
      getStorage: () => storage,
    },
  ),
);
