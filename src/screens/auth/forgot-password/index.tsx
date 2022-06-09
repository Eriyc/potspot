import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Screen, Text} from 'ui';

type ForgotPasswordData = {
  email: string;
};

export const ForgotPasswordScreen = () => {
  const {control} = useForm<ForgotPasswordData>();

  return (
    <Screen>
      <Text variant="header">Glömt lösenord</Text>
      <Input control={control} name="email" label="Emailaddress" />
      <Button label="Skicka återställningsmail" onPress={() => null} />
    </Screen>
  );
};
