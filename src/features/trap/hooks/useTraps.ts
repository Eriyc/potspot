import {useQuery} from 'react-query';

import {supabase} from '@/utils/supabase';

export type Trap = {
  id: number;
  created_by: string; // Profile
  pos: [number, number];
  updated_at: Date;
  displayname: string;
  in_use: boolean;
  bait: number; // Bait
};

const fetchTraps = async (): Promise<Trap[]> => {
  const {body, error} = await supabase.from('traps').select('*');

  if (error) {
    throw error;
  }

  return body?.map(t => ({...t, pos: t.pos.coordinates})) ?? [];
};

export const useTraps = () =>
  useQuery<Trap[], Error>('traps', () => fetchTraps());
