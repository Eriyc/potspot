import React, {createContext, FC, useContext} from 'react';

import {RowValue} from './types';
import {VittjaList} from './VittjaList';

/* 
  TODO: improve structure
*/

type ListContextValue = {
  rows: RowValue[];
  editRow: (value: RowValue) => void;
  addRow: () => void;
  removeRow: (itemId: RowValue['id']) => void;
};
const ListContext = createContext<ListContextValue>({} as ListContextValue);

export const Vittja: FC<ListContextValue> = props => {
  return (
    <ListContext.Provider value={props}>
      <VittjaList />
    </ListContext.Provider>
  );
};

export const useVittja = () => useContext(ListContext);
