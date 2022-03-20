import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Inbox, Map, Settings} from 'react-native-feather';
import {useTailwind} from 'tailwind-rn/dist';

import {Text} from '@/components/Text';

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
        sceneContainerStyle={tw('dark:bg-zinc-900')}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: tw('bg-gray-50 dark:bg-gray-700'),
          tabBarActiveTintColor: tw('text-violet-600 dark:text-violet-400')
            .color as string,

          headerStyle: tw('bg-gray-50 dark:bg-gray-700'),
          headerTitle: ({children}) => (
            <Text style={tw('text-lg font-bold')}>{children}</Text>
          ),
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
            tabBarIcon: ({color}) => <Settings color={color} />,
          }}
          name="settings"
        />
      </AppStack.Navigator>
    </>
  );
};
