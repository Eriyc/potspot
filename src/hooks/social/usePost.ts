import {useQuery} from 'react-query';

import {supabase} from '@/utils/supabase';

import {Catch} from '@/types/social';

const fetchPost = async (postId: number): Promise<Catch> => {
  const {body} = await supabase
    .from<Catch>('catch')
    .select('*')
    .eq('id', postId)
    .single();

  if (!body) throw new Error('usePost.tsx: Not found');

  return body;
};

export const usePost = (postId: number) => {
  return useQuery(['posts', postId], () => fetchPost(postId));
};
