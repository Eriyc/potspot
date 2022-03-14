import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

import tw from '@/utils/tailwind';

type GridListProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  ListHeaderComponent?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ComponentType<any>
    | null;
};

function GridList<T>({...props}: GridListProps<T>) {
  return (
    <FlatList<T>
      contentContainerStyle={tw.style('')}
      numColumns={2}
      {...props}
    />
  );
}

export {GridList};
