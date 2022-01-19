import {flow, Instance, types} from 'mobx-state-tree';

import {AuthStore} from './AuthStore';
import {TrapStore} from './TrapStore';

export const RootStore = types
  .model('RootStore', {
    authStore: types.optional(AuthStore, {
      currentUser: null,
    }),
    trapStore: types.optional(TrapStore, {
      selected: null,
      traps: [],
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
      return self.authStore.currentUser !== null;
    },
  }));

export interface IStore extends Instance<typeof RootStore> {}
