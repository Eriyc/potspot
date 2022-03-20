import {useQuery, useQueryClient} from 'react-query';

import {supabase} from '@/utils/supabase';

import {Bait} from '@/types/bait';

const fetchBait = async (id: number) => {
  const {body} = await supabase
    .from<Bait>('bait')
    .select('*')
    .eq('id', id)
    .single();

  if (!body) {
    throw new Error('Bait does not exists');
  }

  return body;
};

export const useBait = (baitId: number) => {
  const queryClient = useQueryClient();
  return useQuery<Bait>(['bait', baitId], () => fetchBait(baitId), {
    placeholderData: () => {
      return queryClient
        .getQueryData<Bait[]>('baits')
        ?.find(d => d.id === baitId);
    },
  });
};
