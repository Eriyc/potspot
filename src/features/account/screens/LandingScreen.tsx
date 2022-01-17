import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {ChevronRight} from 'react-native-feather';
import tw from '@/utils/tailwind';

import {useNavigation} from '@react-navigation/native';

import {AuthRoute} from '../navigation';
import {Background} from '../components';

export const LandingScreen = () => {
  const navigation = useNavigation<AuthRoute>();
  return (
    <Background>
      {/* Header */}
      <View style={tw`m-4 flex`}>
        <Text>POTSPOT</Text>
      </View>
      <View style={tw`p-12`}>
        {/* Text */}
        <View>
          <Text style={tw`text-white mt-[100%] text-center`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tempus turpis facilisis orci sodales mollis.
          </Text>
        </View>
        {/* Actions */}
        <View style={tw`mt-16`}>
          <Pressable
            onPress={() => navigation.navigate('signup')}
            style={({pressed}) =>
              tw.style(
                'bg-white flex flex-row justify-center py-4 px-8 rounded-full',
                pressed && 'bg-gray-100',
              )
            }>
            <Text style={tw`text-black `}>Skapa ett konto</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('signin')}
            style={tw.style('flex flex-row items-center justify-center mt-4')}>
            <Text style={tw`text-gray-50`}>Jag har redan ett konto</Text>
            <ChevronRight style={tw`text-gray-50`} />
          </Pressable>
        </View>
      </View>
    </Background>
  );
};
