import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Dimensions, Pressable} from 'react-native';
import {useTailwind} from 'tailwind-rn';

import {Text} from '@/components/Text';

import {Trap} from '../hooks';
import {TrapNavigation} from '../navigator';

interface TrapMapCardProps {
  item: Trap;
}

export const TrapMapCard: FC<TrapMapCardProps> = ({item}) => {
  const navigation = useNavigation<TrapNavigation>();
  const tw = useTailwind();

  const onPress = () => {
    navigation.navigate('view', {id: item.id});
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        ...tw(`bg-white p-4 rounded-md dark:bg-cyan-500`),
        ...{
          marginRight: Dimensions.get('screen').width * 0.05,
          width: Dimensions.get('screen').width * 0.8,
        },
      }}>
      <Text>{item.displayname}</Text>
    </Pressable>
  );
};
