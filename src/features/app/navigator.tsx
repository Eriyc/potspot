import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Map, Settings} from 'react-native-feather';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {SettingsScreen} from './screens';
import {TrapNavigation} from '../trap/navigator';

type Routes = {
  home: undefined;
  settings: undefined;
};

const AppStack = createBottomTabNavigator<Routes>();

export const AppNavigation = () => {
  const [dark] = useColorScheme();

  return (
    <>
      <AppStack.Navigator
        sceneContainerStyle={tw.style(dark && 'bg-gray-900')}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: dark ? tw.color('gray-700') : tw.color('gray-50'),
          },
          tabBarActiveTintColor: dark
            ? tw.color('primary-light')
            : tw.color('primary-dark'),
        }}>
        <AppStack.Screen
          component={TrapNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) =>
              focused ? <Map color={color} /> : <Map color={color} />,
          }}
          name="home"
        />
        <AppStack.Screen
          component={SettingsScreen}
          options={{
            headerTitleStyle: {
              color: dark ? tw.color('white') : tw.color('black'),
            },
            headerStyle: {
              backgroundColor: dark
                ? tw.color('primary-dark')
                : tw.color('gray-50'),
            },
            tabBarIcon: ({color}) => <Settings color={color} />,
          }}
          name="settings"
        />
      </AppStack.Navigator>
    </>
  );
};
