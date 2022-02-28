import {TrapSnapshot} from '@/store/TrapStore';
import {NewTrap, SupabaseResponse} from '@/store/types';
import {supabase} from '@/utils/supabase';

import {convertPositionFromDb} from '../lib/convertPosition';

export const createTrap = async (
  trap: NewTrap,
): Promise<SupabaseResponse<TrapSnapshot>> => {
  const {body, error} = await supabase
    .rpc<TrapSnapshot>('create_trap_rpc', {
      details: {
        displayname: trap.displayname,
        pos: JSON.stringify(trap.pos),
      },
    })
    .single();

  const converted = convertPositionFromDb(body);

  return {body: converted, error};
};
