import {Session} from '@supabase/supabase-js';
import {supabase} from 'api/client';
import {useMutation} from 'react-query';

type SignUpData = {
  email: string;
  password: string;
};

const signUp = async ({email, password}: SignUpData) => {
  const {session, error} = await supabase.auth.signUp({email, password});

  if (error || !session) {
    throw new Error(`${error?.status}: ${error?.message}`);
  }

  return {session};
};

export const useSignUp = () => {
  return useMutation<{session: Session}, Error, SignUpData>(signUp);
};
