import {useQuery} from 'react-query';

import {supabase} from '@/utils/supabase';

import {Bait} from '../types';

const fetchBait = async () => {
  const {body} = await supabase.from<Bait>('bait').select('*');
  return body ?? [];
};

export const useBaits = () => useQuery<Bait[]>('baits', () => fetchBait());
