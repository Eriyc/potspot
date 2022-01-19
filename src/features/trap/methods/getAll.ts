import {TrapSnapshot} from '@/store/TrapStore';
import {SupabaseResponse} from '@/store/types';
import {supabase} from '@/utils/supabase';

export const getAll = async (): Promise<SupabaseResponse<TrapSnapshot[]>> => {
  const {body, error} = await supabase.from('traps').select('*');

  return {
    body: body?.map(trap => ({...trap, pos: trap.pos.coordinates})) || null,
    error,
  };
};
