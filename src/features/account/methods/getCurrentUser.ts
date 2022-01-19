import {supabase} from '@/utils/supabase';
type ApiError = 'UNAUTHENTICATED';

type ApiSuccess = {
  email: string;
  id: string;
  active: boolean;
};

export const getCurrentUser = async (): Promise<ApiSuccess | ApiError> => {
  const query = supabase.from('accounts').select('*').single();
  const {body, error} = await query;
  if (error && error.message === 'JWT expired') {
    await supabase.auth.refreshSession();
    const {body: retry} = await query;
    return retry;
  }

  return body;
};
