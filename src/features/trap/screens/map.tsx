import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {View, Text} from 'react-native';
import tw from 'twrnc';

export const MapScreen: FC = observer(() => {
  return (
    <View style={tw`flex flex-1 justify-center items-center bg-gray-700`}>
      <Text>Map screen</Text>
    </View>
  );
});
