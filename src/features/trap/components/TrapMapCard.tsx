import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {Dimensions, Pressable} from 'react-native';

import {Text} from '@/components/Text';

import {useMst} from '@/store';
import {ITrap} from '@/store/types';
import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {TrapRoute} from '../navigator';

interface TrapMapCardProps {
  item: ITrap;
}

export const TrapMapCard: FC<TrapMapCardProps> = observer(({item}) => {
  const {trapStore} = useMst();
  const navigation = useNavigation<TrapRoute>();
  const [dark] = useColorScheme();

  const onPress = () => {
    trapStore.select(item);
    navigation.navigate('view');
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
});
