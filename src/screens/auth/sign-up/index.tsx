import {yupResolver} from '@hookform/resolvers/yup';
import {useSignUp} from 'api/account';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Screen, View} from 'ui';
import {object, string} from 'yup';

type FormData = {
  email: string;
  password: string;
};

const schema = object().shape({
  email: string().required().email(),
  password: string().required().min(6),
});

export const SignUpScreen = () => {
  const signUp = useSignUp();

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    signUp.mutate(data);
  };

  return (
    <Screen>
      <View
        elevation={8}
        shadowRadius={4}
        shadowOpacity={0.3}
        shadowOffset={{height: 2, width: -3}}
        shadowColor="black"
        p="m">
        <Input
          control={control}
          name="email"
          label="Email"
          keyboardType="email-address"
          returnKeyType="next"
        />
        <Input
          control={control}
          name="password"
          label="Lösenord"
          placeholder="********"
          secureTextEntry={true}
        />
        <Button
          label="Skapa konto"
          onPress={handleSubmit(onSubmit)}
          variant="secondary"
          loading={signUp.isLoading}
        />
      </View>
    </Screen>
  );
};
