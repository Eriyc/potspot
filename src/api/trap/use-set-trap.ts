import {supabase} from 'api/client';
import {rollbar} from 'core';
import {useMutation, useQueryClient} from 'react-query';
import {Trap} from './use-all-traps';

type SetTrapData = {
  pos: [number, number];
  id: number;
  bait: number;
};
const setTrap = async (data: SetTrapData) => {
  const {} = await supabase.rpc('v1_trap_move', {
    details: {
      id: data.id,
      pos: `POINT(${data.pos[0]} ${data.pos[1]})`,
      bait: data.bait,
      in_use: true,
    },
  });

  const {error} = await supabase.from('traps').update({}).eq('id', data.id);

  if (error) {
    console.log('Error updating trap position:', error);
    rollbar.error(error);
    throw error;
  }

  return;
};

export const useSetTrap = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, SetTrapData>(data => setTrap(data), {
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries({queryKey: 'traps'});
      queryClient.setQueryData<Trap | undefined>(['trap', vars.id], trap => {
        if (!trap) {
          return undefined;
        }

        return {
          ...trap,
          pos: vars.pos as [number, number],
          bait: vars.bait,
          in_use: true,
        };
      });
    },
  });
};
