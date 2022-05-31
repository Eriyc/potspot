import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home as HomeIcon, Settings} from 'ui';
import {SvgProps} from 'react-native-svg';
import {TrapNavigator, TrapStackParamsList} from './trap-navigator';
import {NavigatorScreenParams} from '@react-navigation/native';
import {SettingsNavigator, SettingsStackParamsList} from './settings-navigator';

export type TabStackParamsList = {
  Home: NavigatorScreenParams<TrapStackParamsList>;
  settings: NavigatorScreenParams<SettingsStackParamsList>;
};

const Tab = createBottomTabNavigator<TabStackParamsList>();

const getRouteIcon = (
  routeName: string,
): (({color, ...props}: SvgProps) => JSX.Element) => {
  let Icon = HomeIcon;
  switch (routeName) {
    case 'Home':
      Icon = HomeIcon;
      break;
    case 'settings':
      Icon = Settings;
      break;
  }

  return Icon;
};

const TabIcon = (color: string, route: string) => {
  const Icon = getRouteIcon(route);
  return <Icon color={color} />;
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => TabIcon(color, route.name),
      })}>
      <Tab.Screen
        name="Home"
        component={TrapNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="settings"
        component={SettingsNavigator}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
