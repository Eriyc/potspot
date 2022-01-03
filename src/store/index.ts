import {flow, Instance, types} from 'mobx-state-tree';
import {createContext, useContext} from 'react';
import {User} from './account/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persist from 'mst-persist';
import {ProfileModel} from './account/profile';

const RootModel = types
  .model({
    user: User,
    profile: ProfileModel,
  })
  .actions(self => ({
    initialize: flow(function* () {
      const user = yield self.user.checkStatus();
      if (self.user.id) {
        const profile = yield self.profile.getProfile(self.user.id);
      }
    }),
  }));

let initialState = RootModel.create({
  user: {},
  profile: {},
});

persist('potspot-store', initialState, {
  storage: AsyncStorage, // default: localStorage
  jsonify: true, // if you use AsyncStorage, this should be true
  // default: true
  whitelist: ['user'], // only these keys will be persisted
}).then(() => console.log('rootStore has been hydrated'));

export const rootStore = initialState;

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
