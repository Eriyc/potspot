import {AuthSession, AuthUser, ApiError} from '@supabase/supabase-js';
import {flow, types} from 'mobx-state-tree';
import {supabase} from '../../utils/supabase';

type SupabaseResponse = {
  body: any | null;
  data: any | null;
  error: ApiError | null;
};

export const ProfileModel = types
  .model({
    user_id: types.optional(types.string, ''),
    full_name: types.maybeNull(types.string),
    biography: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    created_at: types.optional(types.string, ''),
    updated_at: types.optional(types.string, ''),
  })
  .actions(self => ({
    getProfile: flow(function* (user: string) {
      try {
        const result: SupabaseResponse = yield supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user)
          .single() as any;
        if (result.body) {
        }
      } catch (error) {
        console.log(error);
      }
    }),
  }));
