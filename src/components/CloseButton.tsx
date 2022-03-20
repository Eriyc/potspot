import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {X} from 'react-native-feather';
import {useTailwind} from 'tailwind-rn/dist';

import {useColorScheme} from '@/utils/colorScheme';

export const CloseButton = () => {
  const tw = useTailwind();
  const [theme] = useColorScheme();

  const dark = theme === 'dark';

  const navigation = useNavigation();

  return (
    <Pressable
      style={tw(
        'flex self-start flex-row items-center mb-2 p-2 rounded-sm bg-gray-200 dark:bg-gray-700',
      )}
      onPress={() => navigation.goBack()}>
      <X color={dark ? 'white' : 'black'} height={18} width={18} />
      <Text style={tw('text-gray-500 ml-2 dark:text-gray-100')}>Stäng</Text>
    </Pressable>
  );
};
