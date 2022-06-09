import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useSignIn} from 'api/account';
import {AuthNavigationProp} from 'navigation/auth-navigator';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Pressable, Screen, Text, View} from 'ui';
import {object, string} from 'yup';

type FormData = {
  email: string;
  password: string;
};

const schema = object().shape({
  email: string()
    .required('Du måste ange en giltig emailaddress')
    .email('Emailaddressen är inte giltig'),
  password: string()
    .required('Du måste ange ett giltigt lösenord')
    .min(6, 'Lösenordet måste vara längre än 6 karaktärer'),
});

export const SignInScreen = () => {
  const signIn = useSignIn();
  const navigation = useNavigation<AuthNavigationProp<'sign-in'>>();

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    signIn.mutate(data);
  };

  const forgotPassword = () => {
    navigation.navigate('forgot-password');
  };

  return (
    <Screen>
      <View
        justifyContent="center"
        flex={1}
        mt="xl"
        elevation={8}
        shadowRadius={4}
        shadowOpacity={0.3}
        shadowOffset={{height: 2, width: -3}}
        shadowColor="black"
        p="m">
        <Text
          textAlign="center"
          mb="s"
          fontSize={24}
          color="black"
          fontWeight="bold">
          Logga in
        </Text>
        <Input
          control={control}
          name="email"
          label="Email"
          keyboardType="email-address"
        />
        <Input
          control={control}
          name="password"
          label="Lösenord"
          placeholder="********"
          secureTextEntry={true}
        />
        <Button
          label="Login"
          onPress={handleSubmit(onSubmit)}
          variant="secondary"
          loading={signIn.isLoading}
        />
        <Pressable mt="m" alignItems="center" onPress={forgotPassword}>
          <Text>Glömt lösenordet?</Text>
        </Pressable>
      </View>
    </Screen>
  );
};
