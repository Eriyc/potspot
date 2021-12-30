import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens';

type Routes = {
  home: undefined;
};

const AppStack = createNativeStackNavigator<Routes>();

export const AppNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen component={HomeScreen} name="home" />
    </AppStack.Navigator>
  );
};
