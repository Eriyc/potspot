import React from 'react';
import {SettingsScreen} from './screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TrapNavigation} from '../trap/navigator';

type Routes = {
  home: undefined;
  settings: undefined;
};

const AppStack = createBottomTabNavigator<Routes>();

export const AppNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen component={TrapNavigation} name="home" />
      <AppStack.Screen component={SettingsScreen} name="settings" />
    </AppStack.Navigator>
  );
};
