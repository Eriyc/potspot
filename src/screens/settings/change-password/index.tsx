import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {Button, Input, Text, View} from 'ui';

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ChangePasswordScreen = () => {
  const {control} = useForm<ChangePasswordData>();

  return (
    <ScrollView style={styles}>
      <View m="l">
        <View mb="m" alignItems="center">
          <Text variant="header">Ändra ditt lösenord</Text>
          <Text textAlign="center">
            Vänligen ange ditt nuvarande lösenord och ditt nya lösenord.
          </Text>
        </View>
        <Input
          name="currentPassword"
          label="Nuvarande lösenord"
          textContentType="password"
          autoComplete="password"
          control={control}
        />
        <Input
          name="newPassword"
          label="Nytt lösenord"
          textContentType="newPassword"
          autoComplete="password-new"
          control={control}
        />
        <Input
          name="confirmPassword"
          label="Upprepa nytt lösenord"
          textContentType="newPassword"
          autoComplete="password-new"
          control={control}
        />
        <Button label="Ändra lösenord" onPress={() => null} />
      </View>
    </ScrollView>
  );
};

const styles = {
  flexGrow: 1,
};
