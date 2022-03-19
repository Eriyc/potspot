import {useMutation, UseMutationResult, useQueryClient} from 'react-query';

import {supabase} from '@/utils/supabase';

const signOut = async () => {
  const {error: signOutError} = await supabase.auth.signOut();

  if (signOutError) {
    throw signOutError;
  }
};

export const useSignOut = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();
  return useMutation('sign-out', () => signOut(), {
    onSuccess: () => queryClient.cancelQueries(),
  });
};
