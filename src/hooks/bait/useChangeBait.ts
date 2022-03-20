import {useMutation, useQueryClient} from 'react-query';

import {Trap} from '@/features/trap';
import {supabase} from '@/utils/supabase';

import {Bait} from '../types';

type ChangeBaitProps = {
  trapId: number;
  bait: Bait;
};
const changeBait = async ({trapId, bait}: ChangeBaitProps) => {
  const {error, body} = await supabase
    .from<Trap>('traps')
    .update({bait: bait.id}, {returning: 'representation'})
    .eq('id', trapId)
    .single();

  if (error)
    throw new Error(
      `useChangeBait.ts: Could not update bait: ${error.details}`,
    );

  return body;
};

export const useChangeBait = () => {
  const queryClient = useQueryClient();
  return useMutation(
    'change-bait',
    (props: ChangeBaitProps) => changeBait(props),
    {
      onSuccess: trap => {
        queryClient.invalidateQueries('traps');
        queryClient.setQueryData(['trap', trap.id], trap);
      },
    },
  );
};
