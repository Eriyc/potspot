import {Session} from '@supabase/supabase-js';
import {supabase} from 'api/client';
import {useAuth} from 'core';
import {useMutation} from 'react-query';

type SignInData = {
  email: string;
  password: string;
};

const signIn = async ({email, password}: SignInData) => {
  const {session, error} = await supabase.auth.signIn({email, password});

  if (error || !session) {
    throw new Error(`${error?.status}: ${error?.message}`);
  }

  return {session};
};

export const useSignIn = () => {
  const auth = useAuth();
  return useMutation<{session: Session}, Error, SignInData>(signIn, {
    onSuccess: ({session}) =>
      auth.signIn({
        access: session.access_token,
        refresh: session.refresh_token || '',
      }),
  });
};
