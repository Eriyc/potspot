import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Dimensions, Pressable} from 'react-native';

import {Text} from '@/components/Text';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {Trap} from '../hooks';
import {TrapNavigation} from '../navigator';

interface TrapMapCardProps {
  item: Trap;
}

export const TrapMapCard: FC<TrapMapCardProps> = ({item}) => {
  const navigation = useNavigation<TrapNavigation>();
  const [dark] = useColorScheme();

  const onPress = () => {
    navigation.navigate('view', {id: item.id});
  };

  return (
    <Pressable
      onPress={onPress}
      style={tw.style(
        `bg-white mr-[${
          Dimensions.get('screen').width * 0.05
        }] p-4 rounded-md w-[80vw]`,

        dark && 'bg-gray-700',
      )}>
      <Text style={tw.style(dark && 'text-white')}>{item.displayname}</Text>
    </Pressable>
  );
};
