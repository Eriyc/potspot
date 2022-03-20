import {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTailwind} from 'tailwind-rn/dist';

import {FeedScreen} from './screens/feed';

type Paths = {
  feed: undefined;
};

export type FeedRoute = NavigationProp<Paths>;

const Stack = createNativeStackNavigator<Paths>();

export const FeedNavigation = () => {
  const tw = useTailwind();
  return (
    <Stack.Navigator
      initialRouteName="feed"
      screenOptions={{
        contentStyle: tw('dark:bg-gray-900'),
      }}>
      <Stack.Screen name="feed" component={FeedScreen} />
    </Stack.Navigator>
  );
};
