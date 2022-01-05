import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {View, Text, Pressable} from 'react-native';
import tw from 'twrnc';
import {useMst} from '../../../store';

export const HomeScreen: FC = observer(() => {
  const {authStore} = useMst();

  return (
    <View style={tw`flex flex-1 justify-center items-center`}>
      <Text>Home screen</Text>
      <Pressable onPress={authStore.signOut} style={tw`bg-indigo-500 p-4`}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
});
