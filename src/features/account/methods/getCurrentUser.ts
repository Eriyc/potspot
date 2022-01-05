import {supabase} from '@/utils/supabase';
type ApiError = 'UNAUTHENTICATED';

type ApiSuccess = {
  email: string;
  id: string;
  active: boolean;
};

export const getCurrentUser = async (): Promise<ApiSuccess | ApiError> => {
  const {body} = await supabase.from('accounts').select('*').single();

  return body;
};
