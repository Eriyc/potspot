import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';

import {useMst} from '@/store';
import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

export const SettingsScreen: FC = observer(() => {
  const {authStore} = useMst();
  const [dark, toggleColorScheme] = useColorScheme();

  return (
    <View style={tw`flex flex-1 justify-center items-center`}>
      <Text
        style={tw.style('text-gray-700 font-bold', dark && 'text-gray-100')}>
        Settings
      </Text>
      <Text style={tw.style('text-gray-700', dark && 'text-gray-100')}>
        {JSON.stringify(authStore.currentUser)}
      </Text>
      <Pressable
        onPress={authStore.signOut}
        style={tw`bg-primary-dark p-4 mb-2 rounded-md`}>
        <Text style={tw`text-white`}>Sign Out</Text>
      </Pressable>
      <Pressable
        onPress={toggleColorScheme}
        style={tw`bg-primary-dark p-4 rounded-md`}>
        <Text style={tw`text-white`}>Byt färgtema</Text>
      </Pressable>
    </View>
  );
});
