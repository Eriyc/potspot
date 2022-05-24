import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ForgotPasswordScreen,
  LandingScreen,
  SignInScreen,
  SignUpScreen,
} from 'screens/auth';

export type AuthStackParamList = {
  landing: undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="landing" component={LandingScreen} />
      <Stack.Screen name="sign-in" component={SignInScreen} />
      <Stack.Screen name="sign-up" component={SignUpScreen} />
      <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
