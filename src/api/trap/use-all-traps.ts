import {supabase} from 'api/client';
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
    .rpc<GetTrapsGeojsonReturn>('get_traps_geojson')
    .single();
  if (error) {
    throw error;
  }

  return body.j;
};

export const useAllTraps = () =>
  useQuery<GetTrapsGeojsonReturn['j'], Error>('traps', getAllTraps);
