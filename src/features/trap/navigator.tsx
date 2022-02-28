import {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {MapScreen} from './screens';
import {AddTrapScreen} from './screens/add';
import {SetTrapScreen} from './screens/set';
import {ViewTrapScreen} from './screens/view';
import {VittjaTrapScreen} from './screens/vittja';

type Paths = {
  view: undefined;
  map: undefined;
  add: undefined;
  vittja: undefined;
  set: undefined;
};

export type TrapRoute = NavigationProp<Paths>;

const Stack = createNativeStackNavigator<Paths>();

export const TrapNavigation = () => {
  const [dark] = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="map"
      screenOptions={{contentStyle: tw.style(dark && 'bg-gray-900')}}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <Stack.Screen name="map" component={MapScreen} />
        <Stack.Screen name="view" component={ViewTrapScreen} />
        <Stack.Screen
          options={{
            animation: 'simple_push',
            presentation: 'modal',
          }}
          name="add"
          component={AddTrapScreen}
        />
        <Stack.Screen
          options={{
            animation: 'simple_push',
            presentation: 'modal',
          }}
          name="vittja"
          component={VittjaTrapScreen}
        />
        <Stack.Screen
          options={{
            animation: 'simple_push',
            presentation: 'modal',
          }}
          name="set"
          component={SetTrapScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
