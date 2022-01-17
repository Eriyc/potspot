import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MapScreen} from './screens';
import {AddTrapScreen} from './screens/add';
import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

type Paths = {
  map: undefined;
  add: undefined;
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
        <Stack.Screen
          options={{
            animation: 'simple_push',
            presentation: 'modal',
          }}
          name="add"
          component={AddTrapScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
