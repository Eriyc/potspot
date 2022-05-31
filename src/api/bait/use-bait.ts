import {supabase} from 'api/client';
import {useQuery, useQueryClient} from 'react-query';

export type Bait = {
  id: number;
  name: string;
  image_uri: string | null;
};

const getBait = async (id: number) => {
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

export const useBait = (baitId?: number) => {
  const queryClient = useQueryClient();
  return useQuery<Bait>(
    baitId !== undefined ? ['bait', baitId] : [],
    () => getBait(baitId!),
    {
      placeholderData: () => {
        return queryClient
          .getQueryData<Bait[]>('baits')
          ?.find(d => d.id === baitId);
      },
    },
  );
};
