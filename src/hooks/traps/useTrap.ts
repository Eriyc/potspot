import {useQuery} from 'react-query';

import {supabase} from '@/utils/supabase';

import {Trap} from './useTraps';

const fetchTrap = async (id: number) => {
  if (!id) {
    throw Error('Trap not selected');
  }

  const {body} = await supabase.from('traps').select('*').eq('id', id).single();

  return body;
};

export const useTrap = (trapId: number) => {
  return useQuery<Trap>(['trap', trapId], () => fetchTrap(trapId));
};
