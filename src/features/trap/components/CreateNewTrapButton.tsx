import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {Plus} from 'react-native-feather';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {TrapNavigation} from '../navigator';

const CreateNewTrapButton = () => {
  const [dark] = useColorScheme();
  const navigation = useNavigation<TrapNavigation>();

  return (
    <Pressable
      onPress={() => navigation.navigate('add')}
      style={tw.style(
        'bg-white rounded-md p-2 flex flex-row items-center',
        dark && 'bg-gray-700 elevation-4',
      )}>
      <Plus style={tw.style('text-gray-700', dark && 'text-gray-100')} />
      <Text style={tw.style('', dark && 'text-gray-100')}>Skapa ny tina</Text>
    </Pressable>
  );
};

export {CreateNewTrapButton};
