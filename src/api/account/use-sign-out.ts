import {supabase} from 'api/client';
import {useAuth} from 'core';
import {useTrapCache} from 'core/cache';
import {useMutation} from 'react-query';

const signOut = async () => {
  const {error} = await supabase.auth.signOut();

  if (error) {
    throw new Error(`${error?.status}: ${error?.message}`);
  }

  return;
};

export const useSignOut = () => {
  const trapCache = useTrapCache();

  const auth = useAuth();
  return useMutation<void, Error>(signOut, {
    onSuccess: () => {
      trapCache.updateCache([]);
      auth.signOut();
    },
  });
};
