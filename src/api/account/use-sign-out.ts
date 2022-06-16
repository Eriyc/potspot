import {supabase} from 'api/client';
import {useAuth} from 'core';
import {useMutation} from 'react-query';

const signOut = async () => {
  const {error} = await supabase.auth.signOut();

  if (error) {
    throw new Error(`${error?.status}: ${error?.message}`);
  }

  return;
};

export const useSignOut = () => {
  const auth = useAuth();
  return useMutation<void, Error>(signOut, {
    onSuccess: () => {
      auth.signOut();
    },
  });
};
