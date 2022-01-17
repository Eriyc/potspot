import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {X} from 'react-native-feather';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

export const CloseButton = () => {
  const [dark] = useColorScheme();
  const navigation = useNavigation();

  return (
    <Pressable
      style={tw.style(
        'flex self-start flex-row items-center mb-2 p-2 rounded-sm bg-gray-200',
        dark && 'bg-gray-700',
      )}
      onPress={() => navigation.goBack()}>
      <X color={dark ? 'white' : 'black'} height={18} width={18} />
      <Text style={tw.style('text-gray-500 ml-2', dark && 'text-gray-100')}>
        Stäng
      </Text>
    </Pressable>
  );
};
