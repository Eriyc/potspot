import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {NavigationProp} from '@react-navigation/native';
import {SettingsDashboardScreen} from 'screens/settings/dashboard';
import {
  AccountSettingsScreen,
  ChangePasswordScreen,
  ProfileSettingsScreen,
} from 'screens/settings';
import {TrapListScreen} from 'screens/trap';

export type SettingsStackParamsList = {
  dashboard: undefined;
  account: {email?: string; password?: string};
  profile: {};
  'trap-list': undefined;
  'change-password': undefined;
};

export type SettingsNavigationProp<
  T extends keyof SettingsStackParamsList = any,
> = NavigationProp<SettingsStackParamsList, T>;

const Stack = createStackNavigator<SettingsStackParamsList>();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dashboard"
        component={SettingsDashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Group
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          name="account"
          component={AccountSettingsScreen}
          options={{
            title: 'Konto',
          }}
        />
        <Stack.Screen
          name="change-password"
          component={ChangePasswordScreen}
          options={{title: ''}}
        />
        <Stack.Screen name="profile" component={ProfileSettingsScreen} />
        <Stack.Screen
          name="trap-list"
          component={TrapListScreen}
          options={{title: 'Alla tinor'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
