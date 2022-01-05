import {getToken} from '@/utils/auth.storage';
import {supabase} from '@/utils/supabase';
type ApiError = 'UNAUTHENTICATED';

type ApiSuccess = {
  email: string;
  id: string;
  active: boolean;
};

export const getCurrentUser = async (): Promise<ApiSuccess | ApiError> => {
  const {error: refreshError} = await supabase.auth.refreshSession();

  if (refreshError) {
  }

  const {body, error} = await supabase.from('accounts').select('*').single();

  console.log(body, error);
  return body;
};
