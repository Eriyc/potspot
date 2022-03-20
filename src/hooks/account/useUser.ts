import {useEffect, useState} from 'react';
import {useQuery, useQueryClient} from 'react-query';

import {supabase} from '@/utils/supabase';

export type UserAccount = {
  active: boolean;
  email: string;
};

export type UserProfile = {
  username: string;
  biography: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
};

export type User = {
  id: string;
  account: UserAccount;
  profile: UserProfile;
};

const fetchUser = async (userId?: string): Promise<User> => {
  if (!userId) {
    throw new Error('User not specified');
  }

  const accountQuery = supabase
    .from('accounts')
    .select()
    .eq('id', userId)
    .single();

  const profileQuery = supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  const [{body: account, error}, {body: profile}] = await Promise.all([
    accountQuery,
    profileQuery,
  ]);

  if (error) {
    throw new Error(error.message);
  }

  if (!account) {
    throw new Error('User not found');
  }

  const data: User = {account, profile, id: userId};

  return data;
};

export default function useUser() {
  const [userId, setUserId] = useState(() => supabase.auth.session()?.user?.id);

  const queryClient = useQueryClient();

  const user = useQuery<User, Error>(
    ['user', userId],
    () => fetchUser(userId),
    {
      onError: err => console.log('err', err),
    },
  );

  useEffect(() => {
    const event = supabase.auth.onAuthStateChange((authEv, sesh) => {
      switch (authEv) {
        case 'SIGNED_IN':
          setUserId(sesh?.user?.id);
          break;
        case 'SIGNED_OUT':
          queryClient.cancelQueries();
          setUserId(undefined);
          user.remove();
          break;
        default:
          break;
      }
    });
    return () => event.data?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
}
