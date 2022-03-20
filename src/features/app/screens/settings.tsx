import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {Text} from '@/components/Text';

import {useSignOut, useUser} from '@/features/account';
import {useColorScheme} from '@/utils/colorScheme';

export const SettingsScreen: FC = () => {
  const signOutMutation = useSignOut();
  const {data} = useUser();
  const [theme, editTheme] = useColorScheme();
  const tw = useTailwind();

  const switchTheme = () => {
    switch (theme) {
      case 'dark':
        editTheme('system');
        break;
      case 'system':
        editTheme('light');
        break;
      default:
        editTheme('dark');
        break;
    }
  };

  return (
    <View style={tw(`flex flex-1 items-center justify-center`)}>
      <Text style={tw(' font-bold')}>Settings</Text>
      <Text>{JSON.stringify({data})}</Text>
      <Pressable
        onPress={() => signOutMutation.mutate()}
        style={tw(`bg-violet-600 mb-2 p-4 rounded-md`)}>
        <Text style={tw(`text-white`)}>Sign Out</Text>
      </Pressable>
      <Pressable
        onPress={switchTheme}
        style={tw(`bg-violet-600 p-4 rounded-md`)}>
        <Text style={tw(`text-white`)}>Byt färgtema</Text>
      </Pressable>
    </View>
  );
};
