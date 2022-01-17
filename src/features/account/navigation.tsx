import {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {LandingScreen, SignInScreen, SignupScreen} from './screens';

type Paths = {
  landing: undefined;
  signin: undefined;
  signup: undefined;
};

export type AuthRoute = NavigationProp<Paths>;

const Stack = createNativeStackNavigator<Paths>();

export const AuthNavigation = () => (
  <Stack.Navigator initialRouteName="landing">
    <Stack.Group
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="landing" component={LandingScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
