import React, {FC} from 'react';

import {IStore, RootStore} from './RootStore';

const store = RootStore.create({});
export const StoreContext = React.createContext<IStore | null>(store);

export const StoreProvider: FC = ({children}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
