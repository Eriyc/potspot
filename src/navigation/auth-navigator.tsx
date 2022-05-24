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
      <Stack.Screen name="sign-in" component={SignInScreen} />
      <Stack.Screen name="sign-up" component={SignUpScreen} />
      <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
