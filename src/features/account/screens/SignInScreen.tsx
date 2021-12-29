import React from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';

import {Background} from '../components';
import {AuthRoute} from '../navigation';

export const SignInScreen = () => {
  const navigation = useNavigation<AuthRoute>();

  return (
    <Background>
      <ScrollView
        style={tw`flex flex-1`}
        contentContainerStyle={tw`flex flex-grow `}
        bounces={false}
        horizontal={false}>
        <View style={tw`m-8 flex`}>
          <Text>POTSPOT</Text>
        </View>
        <View style={tw`flex flex-1 justify-center`}>
          <View style={tw`bg-white m-4 rounded-xl p-8`}>
            <Text style={tw`text-black`}>Email</Text>
            <TextInput style={tw`text-black bg-gray-100 rounded-md mb-2`} />
            <Text style={tw`text-black`}>Lösenord</Text>
            <TextInput style={tw`text-black bg-gray-100 rounded-md mb-4`} />
            <View style={tw`flex flex-row items-center`}>
              <Pressable
                style={({pressed}) =>
                  tw.style(
                    'bg-indigo-600 p-4 rounded-md mr-2',
                    pressed && 'bg-indigo-300',
                  )
                }
                onPress={() => {}}>
                <Text style={tw`text-white`}>Logga in</Text>
              </Pressable>
              <Text style={tw`text-black text-center flex-1 ml-2`}>
                Glömt lösenordet?
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`py-8`}>
          <Text
            onPress={() => navigation.navigate('signup')}
            style={tw`text-gray-200 text-lg text-center`}>
            Skapa ett konto
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
};
