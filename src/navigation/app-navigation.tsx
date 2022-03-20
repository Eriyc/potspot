import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Inbox, Map, Settings} from 'react-native-feather';
import {useTailwind} from 'tailwind-rn/dist';

import {Header} from '@/components';
import {Text} from '@/components/atoms/text';

import {SettingsScreen} from '@/screens/app';

import {SocialNavigator} from './social-navigation';
import {TrapNavigator} from './trap-navigation';

type Routes = {
  home: undefined;
  social: undefined;
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

          header: Header,
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
          component={SocialNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) =>
              focused ? <Inbox color={color} /> : <Inbox color={color} />,
          }}
          name="social"
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
