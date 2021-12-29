import React, {useRef} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';

import {AuthRoute} from '../navigation';
import {Background} from '../components';

interface FormData {
  email: string;
  password: string;
  confirm: string;
}

const formStyle = tw`text-black bg-gray-100 rounded-md mb-2`;

export const SignupScreen = () => {
  const navigation = useNavigation<AuthRoute>();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm<FormData>();

  const passwordRef = useRef<string>('');
  passwordRef.current = watch('password', '');

  const onSubmit = (data: any) => {
    console.log('data', data);
  };
  const onError = () => {
    console.log('error', errors);
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
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={formStyle}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              )}
              name="email"
            />
            <Text style={tw`text-red-500 mb-2`}>
              {errors.email?.type === 'pattern' && 'Ange en giltig mailaddress'}
            </Text>

            <Text style={tw`text-black`}>Lösenord</Text>

            <Controller
              control={control}
              rules={{
                minLength: 6,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={formStyle}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Lösenord"
                  secureTextEntry
                  textContentType="newPassword"
                />
              )}
              name="password"
            />
            <Text style={tw`text-red-500 mb-2`}>
              {errors.password?.type === 'minLength' &&
                'Lösenordet måste vara längre än 6 karaktärer'}
            </Text>

            <Text style={tw`text-black`}>Bekräfta lösenordet</Text>

            <Controller
              control={control}
              rules={{
                maxLength: 100,
                validate: pw =>
                  pw === passwordRef.current ||
                  'Lösenorden stämmer inte överrens',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={tw`text-black bg-gray-100 rounded-md mb-2`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  textContentType="newPassword"
                  onSubmitEditing={handleSubmit(onSubmit, onError)}
                />
              )}
              name="confirm"
            />
            <Text style={tw`text-red-500 mb-2`}>{errors.confirm?.message}</Text>

            <Pressable
              style={({pressed}) =>
                tw.style(
                  'bg-indigo-600 p-4 rounded-md',
                  pressed && 'bg-indigo-300',
                )
              }
              onPress={handleSubmit(onSubmit, onError)}>
              <Text style={tw`text-white`}>Skapa konto</Text>
            </Pressable>
          </View>
        </View>
        <View style={tw`py-8`}>
          <Text
            onPress={() => {
              reset({
                confirm: '',
                email: '',
                password: '',
              });
              navigation.navigate('signin');
            }}
            style={tw`text-gray-200 text-lg text-center`}>
            Jag har redan ett konto
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
};
