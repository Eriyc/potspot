import {supabase} from 'api/client';
import {useQuery} from 'react-query';
import {Bait} from './use-bait';

const getBait = async () => {
  const {body} = await supabase.from<Bait>('bait').select('*');

  if (!body) {
    throw new Error('Bait does not exists');
  }

  return body;
};

export const useAllBait = () => {
  return useQuery<Bait[]>('bait', () => getBait(), {});
};
