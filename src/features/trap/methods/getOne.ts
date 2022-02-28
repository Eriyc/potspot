import {TrapSnapshot} from '@/store/TrapStore';
import {SupabaseResponse} from '@/store/types';
import {supabase} from '@/utils/supabase';

export const getOne = async (
  id: TrapSnapshot['id'],
): Promise<SupabaseResponse<TrapSnapshot[]>> => {
  const {body, error} = await supabase
    .from('traps')
    .select('*')
    .eq('id', id)
    .single();

  return {
    body: body ? {...body, pos: body.pos.coordinates} : null,
    error,
  };
};
