import {ApiError, AuthSession, AuthUser, Provider} from '@supabase/supabase-js';
import {flow, getRoot, types} from 'mobx-state-tree';
import {supabase} from '../../utils/supabase';

type SupabaseResponse = {
  session: AuthSession | null;
  user: AuthUser | null;
  provider?: Provider | undefined;
  url?: string | symbol | undefined;
  error: ApiError | null;
};

export const User = types
  .model({
    id: types.optional(types.string, ''),
    isAuthenticated: types.maybe(types.optional(types.boolean, false)),
    needsVerifyEmail: types.optional(types.boolean, false),
    status: types.optional(
      types.enumeration(['pending', 'done', 'error']),
      'pending',
    ),
  })
  .actions(self => {
    const signIn = flow(function* (email: string, password: string) {
      self.status = 'pending';
      try {
        const response: SupabaseResponse = yield supabase.auth.signIn({
          email,
          password,
        });

        if (!response.user) {
          throw new Error('User was not found');
        }

        self.id = response.user.id;
        self.status = 'done';
        self.isAuthenticated = true;
      } catch (error) {
        self.status = 'error';
        self.isAuthenticated = false;
      }
    });
    const signUp = flow(function* (email: string, password: string) {
      try {
        const response = yield supabase.auth.signUp({email, password});
        console.log('response', response);

        if (!response.user) {
          throw new Error('User was not found');
        }

        self.id = response.user.id;
        self.status = 'done';
        self.isAuthenticated = true;
      } catch (error) {
        self.isAuthenticated = false;
        self.status = 'error';
      }
    });
    const updateStatus = (status: 'pending' | 'done' | 'error') => {
      self.status = status;
    };
    const checkStatus = flow(function* () {
      console.log('check', getRoot(self));
      new Promise(resolve => setTimeout(() => resolve, 2000)).then(() => {
        updateStatus('done');
      });
    });
    const signOut = () => {
      self.id = '';

      self.isAuthenticated = false;
      self.status = 'done';
    };

    return {signIn, signOut, signUp, checkStatus};
  });
