import {supabase} from 'api/client';
import {useTrapCache} from 'core/cache';
import {useQuery} from 'react-query';

export type Trap = {
  id: number;
  created_by: string; // Profile
  pos: [number, number];
  updated_at: Date;
  displayname: string;
  in_use: boolean;
  bait: number; // Bait
};

type TrapGeometry = GeoJSON.Point;
type TrapProperties = {
  displayname: string;
};
export type TrapFeatureCollection = GeoJSON.FeatureCollection<
  TrapGeometry,
  TrapProperties
>;
export type TrapFeatureType = GeoJSON.Feature<GeoJSON.Point, TrapProperties>;

type GetTrapsGeojsonReturn = {
  j: TrapFeatureCollection;
};

const getAllTraps = async (): Promise<GetTrapsGeojsonReturn['j']> => {
  const {error, body} = await supabase
    .rpc<GetTrapsGeojsonReturn>('v1_trap_fetch-all', {})
    .single();
  if (error) {
    console.log('error fetching all traps:', error);
    throw error;
  }

  if (!body.j.features) {
    body.j.features = [];
  }

  return body.j;
};

export const useAllTraps = () => {
  const trapCache = useTrapCache();
  return useQuery<GetTrapsGeojsonReturn['j'], Error>('traps', getAllTraps, {
    onSuccess: data => {
      trapCache.updateCache(data.features);
    },
    initialData: {type: 'FeatureCollection', features: trapCache.cached},
    initialDataUpdatedAt: trapCache.updatedAt,
  });
};
