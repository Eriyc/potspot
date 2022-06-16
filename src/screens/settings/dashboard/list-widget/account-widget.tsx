import {useSignOut} from 'api/account';
import React from 'react';

import {User} from 'react-native-feather';
import {Pressable, Text, theme} from 'ui';
import {SectionData} from '../types';

const SignOutButton = () => {
  const signOut = useSignOut();

  const onPress = () => signOut.mutate();

  return (
    <Pressable
      onPress={onPress}
      p="m"
      flexDirection="row"
      android_ripple={{borderless: true, color: theme.colors.grey3}}
      alignItems="center">
      <Text color="red">Logga ut</Text>
    </Pressable>
  );
};

export const AccountWidget: SectionData = {
  title: 'Du',
  icon: <User height={24} width={24} color={'black'} />,
  data: [
    {external: false, label: 'Profil', navigateTo: 'profile'},
    {external: false, label: 'Konto', navigateTo: 'account'},
    {custom: true, component: <SignOutButton />},
  ],
};
