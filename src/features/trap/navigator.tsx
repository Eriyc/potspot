import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MapScreen} from './screens';

type Paths = {
  map: undefined;
};

export type AuthRoute = NavigationProp<Paths>;

const Stack = createNativeStackNavigator<Paths>();

export const TrapNavigation = () => (
  <Stack.Navigator initialRouteName="map">
    <Stack.Group
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="map" component={MapScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
