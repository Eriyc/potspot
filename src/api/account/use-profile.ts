import {supabase} from 'api/client';
import {useQuery} from 'react-query';

type ProfileResult = {username: string; avatar: string};

const getProfile = async (uid: string): Promise<ProfileResult> => {
  const {body} = await supabase
    .from('profiles')
    .select('username, avatar')
    .eq('user_id', uid)
    .single();

  if (!body) {
    throw new Error('useProfile.ts: profile does not exist,');
  }

  return body;
};

export const useProfile = (uid: string) =>
  useQuery<ProfileResult, Error>(['profile', uid], () => getProfile(uid));
