import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {NavigationProp} from '@react-navigation/native';
import {SettingsDashboardScreen} from 'screens/settings/dashboard';
import {AccountSettingsScreen, ProfileSettingsScreen} from 'screens/settings';

export type SettingsStackParamsList = {
  dashboard: undefined;
  account: {email?: string; password?: string};
  profile: {};
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
        <Stack.Screen name="account" component={AccountSettingsScreen} />
        <Stack.Screen name="profile" component={ProfileSettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
