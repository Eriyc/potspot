import {NavigationProp, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTailwind} from 'tailwind-rn/dist';

import {Header} from '@/components/organisms';

import {FeedScreen} from '@/screens/social';
import {SocialPostScreen} from '@/screens/social';

type Paths = {
  feed: undefined;
  post: {id: number};
};

export type SocialRoute = NavigationProp<Paths>;
export type PostRoute = RouteProp<Paths, 'post'>;

const Stack = createNativeStackNavigator<Paths>();

export const SocialNavigator = () => {
  const tw = useTailwind();
  return (
    <Stack.Navigator
      initialRouteName="feed"
      screenOptions={{
        contentStyle: tw('dark:bg-zinc-900'),
        headerStyle: tw('bg-gray-50 dark:bg-gray-700'),
        header: Header,
      }}>
      <Stack.Screen name="feed" component={FeedScreen} />
      <Stack.Screen name="post" component={SocialPostScreen} />
    </Stack.Navigator>
  );
};
