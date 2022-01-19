import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {Dimensions, Text, View} from 'react-native';

import {ITrap} from '@/store/types';
import tw from '@/utils/tailwind';

interface TrapMapCardProps {
  item: ITrap;
}

export const TrapMapCard: FC<TrapMapCardProps> = observer(({item}) => {
  return (
    <View
      style={tw.style(
        `bg-white mr-[${
          Dimensions.get('screen').width * 0.05
        }] p-4 rounded-md w-[80vw]`,
      )}>
      <Text>{item.displayname}</Text>
    </View>
  );
});
