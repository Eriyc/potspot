import React from 'react';
import {HomeScreen} from './screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

type Routes = {
  home: undefined;
};

const AppStack = createBottomTabNavigator<Routes>();

export const AppNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen component={HomeScreen} name="home" />
    </AppStack.Navigator>
  );
};
