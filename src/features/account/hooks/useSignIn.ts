import {AuthUser} from '@supabase/supabase-js';
import {useMutation, UseMutationResult} from 'react-query';

import {supabase} from '@/utils/supabase';

type User = {
  email: string;
  password: string;
};

const signIn = async (user: User) => {
  const {user: data, error: signUpError} = await supabase.auth.signIn({
    email: user.email,
    password: user.password,
  });

  if (!data) {
    throw signUpError;
  }

  return data;
};

export const useSignIn = (): UseMutationResult<AuthUser, Error, User> =>
  useMutation('sign-in', (user: User) => signIn(user), {});
