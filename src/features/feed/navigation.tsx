import {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {FeedScreen} from './screens/feed';

type Paths = {
  feed: undefined;
};

export type FeedRoute = NavigationProp<Paths>;

const Stack = createNativeStackNavigator<Paths>();

export const FeedNavigation = () => {
  const [dark] = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="feed"
      screenOptions={{
        contentStyle: tw.style(dark && 'bg-gray-900'),
      }}>
      <Stack.Screen name="feed" component={FeedScreen} />
    </Stack.Navigator>
  );
};
