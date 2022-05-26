import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ForgotPasswordScreen,
  LandingScreen,
  SignInScreen,
  SignUpScreen,
} from 'screens/auth';
import {NavigationProp} from '@react-navigation/native';

export type AuthStackParamList = {
  landing: undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
};

export type AuthNavigationProp<T extends keyof AuthStackParamList = any> =
  NavigationProp<AuthStackParamList, T>;

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="landing"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="sign-in"
        component={SignInScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="sign-up"
        options={{title: ''}}
        component={SignUpScreen}
      />
      <Stack.Screen
        name="forgot-password"
        options={{title: ''}}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};
