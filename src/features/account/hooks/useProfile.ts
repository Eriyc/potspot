import {useQuery} from 'react-query';

import {supabase} from '@/utils/supabase';

import {UserProfile} from './useUser';

const fetchProfile = async (userId: string): Promise<UserProfile> => {
  const {body} = await supabase
    .from('profiles')
    .select('username, avatar')
    .eq('user_id', userId)
    .single();

  if (!body) {
    throw new Error('useProfile.ts: profile does not exist,');
  }

  return body;
};

export const useProfile = (userId: string) => {
  return useQuery(['profile', userId], () => fetchProfile(userId));
};
