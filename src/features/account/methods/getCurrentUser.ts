import {getToken} from '@/utils/auth.storage';
import {supabase} from '@/utils/supabase';
type ApiError = 'UNAUTHENTICATED';

type ApiSuccess = {
  email: string;
  id: string;
  active: boolean;
};

export const getCurrentUser = async (): Promise<ApiSuccess | ApiError> => {
  const {body, error} = await supabase.from('accounts').select('*').single();

  console.log(body, error);
  return body;
};
