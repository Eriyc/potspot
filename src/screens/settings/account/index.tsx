import {useNavigation} from '@react-navigation/native';
import {supabase} from 'api/client';
import {SettingsNavigationProp} from 'navigation/settings-navigator';
import React from 'react';
import {Button, Text, View} from 'ui';

export const AccountSettingsScreen = () => {
  const navigation = useNavigation<SettingsNavigationProp<'account'>>();
  const changePassword = () => {
    navigation.navigate('change-password');
  };

  return (
    <View>
      <View margin="l">
        <View mb="l">
          <Text variant="label">Email</Text>
          <Text variant="body">{supabase.auth.user()?.email}</Text>
        </View>
        <Button label="Ändra lösenord" onPress={changePassword} />
      </View>
    </View>
  );
};
