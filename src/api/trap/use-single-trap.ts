import {supabase} from 'api/client';
import {useQuery, useQueryClient} from 'react-query';
import {Trap, TrapFeatureCollection} from './use-all-traps';

const getTrap = async (id: number): Promise<Trap> => {
  if (!id) {
    throw Error('Trap not selected');
  }

  const {body} = await supabase.rpc('v1_trap_fetch-single', {id: id}).single();

  return {...body, pos: body.pos.coordinates};
};

export const useSingleTrap = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery<Trap | Partial<Trap>>(['trap', id], () => getTrap(id), {
    placeholderData: () => {
      const item = queryClient
        .getQueryData<TrapFeatureCollection>('traps')
        ?.features.find(d => d.id === id);
      if (!item) {
        return;
      }

      return {
        id: parseInt(item.id!.toString(), 10),
        displayname: item.properties.displayname,
        pos: item.geometry.coordinates as [number, number],
      };
    },
  });
};
