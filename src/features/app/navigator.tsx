import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Inbox, Map, Settings} from 'react-native-feather';
import {useTailwind} from 'tailwind-rn/dist';

import {SettingsScreen} from './screens';
import {FeedNavigation} from '../feed';
import {TrapNavigator} from '../trap/navigator';

type Routes = {
  home: undefined;
  'feed-navigator': undefined;
  settings: undefined;
};

const AppStack = createBottomTabNavigator<Routes>();

export const AppNavigation = () => {
  const tw = useTailwind();

  return (
    <>
      <AppStack.Navigator
        sceneContainerStyle={tw('dark:bg-gray-900')}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: tw('bg-gray-50 dark:bg-gray-700'),
          tabBarActiveTintColor: tw('primary-light dark:primary-dark')
            .color as string,
        }}>
        <AppStack.Screen
          component={TrapNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) =>
              focused ? <Map color={color} /> : <Map color={color} />,
          }}
          name="home"
        />
        <AppStack.Screen
          component={FeedNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) =>
              focused ? <Inbox color={color} /> : <Inbox color={color} />,
          }}
          name="feed-navigator"
        />
        <AppStack.Screen
          component={SettingsScreen}
          options={{
            headerTitleStyle: tw('text-black dark:text-white'),
            headerStyle: tw('bg-white dark:bg-zinc-700 shadow-md'),
            tabBarIcon: ({color}) => <Settings color={color} />,
          }}
          name="settings"
        />
      </AppStack.Navigator>
    </>
  );
};
