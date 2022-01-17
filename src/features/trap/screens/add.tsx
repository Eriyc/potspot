import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';
import {X} from 'react-native-feather';
import {TrapRoute} from '../navigator';

export const AddTrapScreen: FC = () => {
  const navigation = useNavigation<TrapRoute>();
  const [dark] = useColorScheme();
  return (
    <View style={tw.style('p-4')}>
      <Pressable
        style={tw.style(
          'flex self-start flex-row items-center mb-2 p-2 rounded-sm<',
          dark && 'bg-gray-700',
        )}
        onPress={() => navigation.goBack()}>
        <X color={dark ? 'white' : 'black'} height={18} width={18} />
        <Text style={tw.style('text-gray-500 ml-2', dark && 'text-gray-100')}>
          Stäng
        </Text>
      </Pressable>
      <Text
        style={tw.style('text-2xl text-black font-bold', dark && 'text-white')}>
        Skapa ny tina
      </Text>
    </View>
  );
};
