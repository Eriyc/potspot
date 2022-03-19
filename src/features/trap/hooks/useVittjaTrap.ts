import {Point} from 'geojson';
import {useMutation, useQueryClient} from 'react-query';

import {supabase} from '@/utils/supabase';

type VittjaTrapProps = {
  trap_id: number;
  bait_id: number;
  created_by: string;
  data: any;
  position: Point;
};

const vittjaTrap = async (details: VittjaTrapProps) => {
  const {body, error} = await supabase.from('catch').insert(details);

  if (error) {
    throw error;
  }

  return body;
};

export const useVittja = () => {
  const queryClient = useQueryClient();
  return useMutation(
    'vittja-trap',
    (props: VittjaTrapProps) => vittjaTrap(props),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    },
  );
};
