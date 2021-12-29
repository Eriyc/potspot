import {Instance, onSnapshot, types} from 'mobx-state-tree';
import {createContext, useContext} from 'react';
import {User} from './account/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootModel = types.model({
  user: User,
});

let initialState = RootModel.create({
  user: {},
});

const createStore = async () => {
  const saved = await AsyncStorage.getItem('mst-state');
  if (saved) {
    const json = JSON.parse(saved);
    if (RootModel.is(json)) {
      initialState = RootModel.create(json);
    }
  }
};

createStore();

export const rootStore = initialState;

onSnapshot(rootStore, snapshot => {
  console.log('Snapshot: ', snapshot);
  AsyncStorage.setItem('mst-state', JSON.stringify(snapshot));
});
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
