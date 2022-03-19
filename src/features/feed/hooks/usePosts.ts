import {useQuery} from 'react-query';

import {supabase} from '@/utils/supabase';

import {Catch} from '../types';

const fetchPosts = async (): Promise<Catch[]> => {
  const {body, error} = await supabase
    .from<Catch>('catch')
    .select('id, created_by, created_at, position');

  if (error) throw new Error('Not found');

  console.log(body);

  return body ?? [];
};

export const usePosts = () => {
  return useQuery('posts', () => fetchPosts());
};
