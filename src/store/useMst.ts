import React from 'react';

import {StoreContext} from './Provider';
import {IStore} from './RootStore';

export function useMst(): IStore {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error('StoreProvider is not defined');
  }

  return store;
}
