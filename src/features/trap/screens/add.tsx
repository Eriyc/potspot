import {useNavigation} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {CloseButton} from '@/components';

import {INITIAL_POS} from '@/features/trap';
import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {PickLocationMap} from '../components';
import {TrapRoute} from '../navigator';

export const AddTrapScreen: FC = () => {
  const navigation = useNavigation<TrapRoute>();
  const [dark] = useColorScheme();

  const [name, setName] = useState('');
  const [location, setLocation] = useState(INITIAL_POS);

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={60}
      contentContainerStyle={tw.style('p-4 pb-16')}>
      <CloseButton />
      <Text
        style={tw.style('text-2xl text-black font-bold', dark && 'text-white')}>
        Skapa ny tina
      </Text>

      <PickLocationMap />

      <View>
        <Text
          style={tw.style('text-gray-500 text-lg', dark && 'text-gray-100')}>
          Namnge tinan
        </Text>
        <TextInput style={tw.style('bg-gray-700 rounded-sm text-white')} />
      </View>

      <Pressable
        style={tw.style(
          'bg-primary-light rounded-sm mt-4 p-2 flex flex-row items-center justify-center',
          dark && 'bg-primary-dark',
        )}>
        <Text style={tw.style('text-white text-lg', dark && 'text-white')}>
          Skapa
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};
