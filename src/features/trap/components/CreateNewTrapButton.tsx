import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {Plus} from 'react-native-feather';
import {useTailwind} from 'tailwind-rn/dist';

import {TrapNavigation} from '../navigator';

const CreateNewTrapButton = () => {
  const tw = useTailwind();
  const navigation = useNavigation<TrapNavigation>();

  return (
    <Pressable
      onPress={() => navigation.navigate('add')}
      style={{
        ...{elevation: 4},
        ...tw(
          'bg-white rounded-md p-2 flex flex-row items-center dark:bg-gray-700',
        ),
      }}>
      <Plus style={tw('text-gray-700 dark:text-gray-100')} />
      <Text style={tw('dark:text-gray-100')}>Skapa ny tina</Text>
    </Pressable>
  );
};

export {CreateNewTrapButton};
