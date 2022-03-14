import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';

import tw from '@/utils/tailwind';

import {Background} from '../components';
import {AuthRoute} from '../navigation';
import {useMst} from '../../../store';

interface FormData {
  email: string;
  password: string;
}

const formStyle = tw`mb-2 text-black bg-gray-100 rounded-md`;

export const SignInScreen = observer(() => {
  const navigation = useNavigation<AuthRoute>();
  const {authStore} = useMst();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const result = authStore.signIn(data.email, data.password);
    console.log(result);
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
        <View style={tw`flex m-8`}>
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
                  textContentType="password"
                  onSubmitEditing={handleSubmit(onSubmit, onError)}
                />
              )}
              name="password"
            />
            <Text style={tw`mb-2 text-red-500`}>
              {errors.password?.type === 'minLength' &&
                'Lösenordet måste vara längre än 6 karaktärer'}
            </Text>
            <View style={tw`flex flex-row items-center`}>
              <Pressable
                style={({pressed}) =>
                  tw.style(
                    'bg-indigo-600 p-4 rounded-md mr-2',
                    pressed && 'bg-indigo-300',
                  )
                }
                onPress={handleSubmit(onSubmit, onError)}>
                <Text style={tw`text-white`}>Logga in</Text>
              </Pressable>
              <Text style={tw`flex-1 ml-2 text-center text-black`}>
                Glömt lösenordet?
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`py-8`}>
          <Text
            onPress={() => navigation.navigate('signup')}
            style={tw`text-lg text-center text-gray-200`}>
            Skapa ett konto
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
});
