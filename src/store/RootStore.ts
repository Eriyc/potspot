import {Instance, types} from 'mobx-state-tree';
import {AuthStore} from './AuthStore';

export const RootStore = types
  .model('RootStore', {
    authStore: types.optional(AuthStore, {
      currentUser: undefined,
    }),
  })
  .actions(self => {
    const afterCreate = () => {
      self.authStore.getCurrentUser();
    };

    return {afterCreate};
  })
  .views(self => ({
    get isLoggedIn() {
      return self.authStore.currentUser !== undefined;
    },
  }));

export interface IStore extends Instance<typeof RootStore> {}
