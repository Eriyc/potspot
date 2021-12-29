import React from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';

import {AuthRoute} from '../navigation';
import {Background} from '../components';

export const SignupScreen = () => {
  const navigation = useNavigation<AuthRoute>();

  const handleSignUp = () => {
    
  };

  return (
    <Background>
      <ScrollView
        style={tw`flex flex-1`}
        contentContainerStyle={tw`flex flex-grow `}
        bounces={false}
        horizontal={false}>
        <View style={tw`m-8`}>
          <Text>POTSPOT</Text>
        </View>
        <View style={tw`flex flex-1 justify-center`}>
          <View style={tw`bg-white m-4 rounded-xl p-8`}>
            <Text style={tw`text-black`}>Email</Text>
            <TextInput style={tw`text-black bg-gray-100 rounded-md mb-2`} />
            <Text style={tw`text-black`}>Lösenord</Text>
            <TextInput style={tw`text-black bg-gray-100 rounded-md mb-4`} />
            <Text style={tw`text-black`}>Bekräfta lösenord</Text>
            <TextInput style={tw`text-black bg-gray-100 rounded-md mb-4`} />
            <Pressable
              style={({pressed}) =>
                tw.style(
                  'bg-indigo-600 p-4 rounded-md',
                  pressed && 'bg-indigo-300',
                )
              }
              onPress={() => {}}>
              <Text style={tw`text-white`}>Skapa konto</Text>
            </Pressable>
          </View>
        </View>
        <View style={tw`py-8`}>
          <Text
            onPress={() => navigation.navigate('signin')}
            style={tw`text-gray-200 text-lg text-center`}>
            Jag har redan ett konto
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
};
