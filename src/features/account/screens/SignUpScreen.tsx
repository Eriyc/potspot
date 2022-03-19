import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';

import tw from '@/utils/tailwind';

import {Background} from '../components';
import {useCreateUser} from '../hooks/useCreateUser';
import {AuthRoute} from '../navigation';

interface FormData {
  email: string;
  password: string;
  confirm: string;
}

const formStyle = tw`mb-2 text-black bg-gray-100 rounded-md`;

export const SignupScreen = () => {
  const navigation = useNavigation<AuthRoute>();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm<FormData>();

  const createUserMutation = useCreateUser();

  const passwordRef = useRef<string>('');
  passwordRef.current = watch('password', '');

  const onSubmit = (data: FormData) => {
    createUserMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };
  const onError = () => {
    console.log('error', errors);
  };

  return (
    <Background>
      <ScrollView
        style={tw`flex flex-1`}
        contentContainerStyle={tw`flex flex-grow`}
        bounces={false}
        horizontal={false}>
        <View style={tw`m-8`}>
          <Text>POTSPOT</Text>
        </View>
        <View style={tw`flex flex-1 justify-center`}>
          <View style={tw`p-8 m-4 bg-white rounded-xl`}>
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
            <Text style={tw`mb-2 text-red-500`}>
              {errors.email && 'Ange en giltig mailaddress'}
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
            <Text style={tw`mb-2 text-red-500`}>
              {errors.password &&
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
                  style={tw`mb-2 text-black bg-gray-100 rounded-md`}
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
            <Text style={tw`mb-2 text-red-500`}>{errors.confirm?.message}</Text>

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
            style={tw`text-lg text-center text-gray-200`}>
            Jag har redan ett konto
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
};
