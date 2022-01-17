import {flow, types} from 'mobx-state-tree';
import * as userMethods from '@/features/account/methods';
import {eraseToken, persistToken} from '@/utils/auth.storage';

export const User = types
  .model('User', {
    id: types.string,
    email: types.string,
    active: types.optional(types.boolean, true),
  })
  .views(self => ({
    get isAuthenticated(): boolean {
      return !!self.id && self.active;
    },
  }));

export const AuthStore = types
  .model('AuthStore', {
    currentUser: types.maybeNull(User),
  })
  .actions(self => {
    const signIn = flow(function* (email: string, password: string) {
      try {
        const userResponse = yield userMethods.signIn(email, password);
        console.log(userResponse);

        persistToken(userResponse.token);

        self.currentUser = userResponse.user;
      } catch (error) {
        console.log(error);
      }
    });

    const signUp = flow(function* (email: string, password: string) {
      const userResponse = yield userMethods.signUp(email, password);

      persistToken(userResponse.token);

      self.currentUser = userResponse.user;
    });

    const getCurrentUser = flow(function* () {
      const userResponse = yield userMethods.getCurrentUser();

      if (typeof userResponse !== 'string' && userResponse !== undefined) {
        self.currentUser = userResponse;
      }
    });

    const signOut = () => {
      eraseToken();
      self.currentUser = null;
    };

    return {signUp, signOut, signIn, getCurrentUser};
  });
