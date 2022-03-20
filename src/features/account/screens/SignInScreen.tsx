import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, SubmitErrorHandler, useForm} from 'react-hook-form';
import {Pressable, ScrollView, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {Text} from '@/components/Text';

import {Background} from '../components';
import {useSignIn} from '../hooks/useSignIn';
import {AuthRoute} from '../navigation';

interface FormData {
  email: string;
  password: string;
}

const formStyle = `mb-2 text-black bg-gray-100 rounded-md`;

export const SignInScreen = () => {
  const navigation = useNavigation<AuthRoute>();
  const tw = useTailwind();

  const signInMutation = useSignIn();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    signInMutation.mutate({email: data.email, password: data.password});
  };
  const onError: SubmitErrorHandler<FormData> = ({email, password}) => {
    console.log('error', email, password);
  };

  return (
    <Background>
      <ScrollView
        style={tw(`flex flex-1`)}
        contentContainerStyle={tw(`flex flex-grow`)}
        bounces={false}
        horizontal={false}>
        <View style={tw(`flex m-8`)}>
          <Text>POTSPOT</Text>
        </View>
        <View style={tw(`flex flex-1 justify-center`)}>
          <View style={tw(`bg-white m-4 p-8 rounded-xl`)}>
            <View style={tw(`flex items-center justify-center`)}>
              <Text style={tw('text-red-500')}>
                {signInMutation.error?.message}
              </Text>
            </View>
            <Text style={tw(`text-black`)}>Email</Text>
            <Controller
              control={control}
              rules={{
                required: 'Email är obligatoriskt',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Ange en giltig email-address',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={tw(formStyle)}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              )}
              name="email"
            />
            <Text style={tw(`mb-2 text-red-500`)}>{errors.email?.message}</Text>
            <Text style={tw(`text-black`)}>Lösenord</Text>

            <Controller
              control={control}
              rules={{
                required: 'Lösenord är obligatoriskt',
                minLength: 6,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={tw(formStyle)}
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
            <Text style={tw(`mb-2 text-red-500`)}>
              {errors.password?.type === 'minLength' &&
                'Lösenordet måste vara längre än 6 karaktärer'}
            </Text>
            <View style={tw(`flex flex-row items-center`)}>
              <Pressable
                style={() => tw('bg-indigo-600 p-4 rounded-md mr-2')}
                onPress={handleSubmit(onSubmit, onError)}>
                <Text style={tw(`text-white`)}>Logga in</Text>
              </Pressable>
              <Text style={tw(`flex-1 ml-2 text-black text-center`)}>
                Glömt lösenordet?
              </Text>
            </View>
          </View>
        </View>
        <View style={tw(`py-8`)}>
          <Text
            onPress={() => navigation.navigate('signup')}
            style={tw(`text-center text-gray-200 text-lg`)}>
            Skapa ett konto
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
};
