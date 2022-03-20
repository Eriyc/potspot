import {useMutation} from 'react-query';

import {supabase} from '@/utils/supabase';

type User = {
  email: string;
  password: string;
};

const createUser = async (user: User) => {
  const {user: data, error: signUpError} = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (!data) {
    throw signUpError;
  }

  return data;
};

export const useCreateUser = () =>
  useMutation('create-user', (user: User) => createUser(user), {});
