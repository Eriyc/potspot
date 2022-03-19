import {Point} from 'geojson';
import {useMutation} from 'react-query';

import {supabase} from '@/utils/supabase';

import {Trap} from './useTraps';

type CreateTrapProps = {
  pos: Point;
  displayname: string;
};

const createTrap = async ({pos, displayname}: CreateTrapProps) => {
  const {body, error} = await supabase
    .rpc<Trap>('create_trap_rpc', {
      details: {
        displayname: displayname,
        pos: JSON.stringify(pos),
      },
    })
    .single();

  if (error) {
    throw error;
  }

  return body;
};

export const useCreateTrap = () =>
  useMutation('create-trap', (props: CreateTrapProps) => createTrap(props));
