import {flow, Instance, types} from 'mobx-state-tree';
import {AuthStore} from './AuthStore';

export const RootStore = types
  .model('RootStore', {
    authStore: types.optional(AuthStore, {
      currentUser: undefined,
    }),
  })
  .actions(self => {
    const initialize = flow(function* () {
      yield self.authStore.getCurrentUser();
    });

    return {initialize};
  })
  .views(self => ({
    get isLoggedIn() {
      return self.authStore.currentUser !== undefined;
    },
  }));

export interface IStore extends Instance<typeof RootStore> {}
