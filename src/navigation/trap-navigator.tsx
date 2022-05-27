import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GetTrapScreen,
  PickBaitModal,
  SetTrapScreen,
  TrapDetails,
  TrapOverviewScreen,
} from 'screens/trap';
import {NavigationProp, RouteProp} from '@react-navigation/native';

export type TrapStackParamsList = {
  overview: undefined;
  details: {id: number};
  set: {id: number; bait?: number};
  get: {id: number};
  'pick-bait-modal': {returnTo: keyof TrapStackParamsList; bait: number};
};

export type TrapRoute<T extends keyof TrapStackParamsList> = RouteProp<
  TrapStackParamsList,
  T
>;

export type TrapNavigationProp<T extends keyof TrapStackParamsList> =
  NavigationProp<TrapStackParamsList, T>;

const Stack = createStackNavigator<TrapStackParamsList>();

export const TrapNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="overview"
        component={TrapOverviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="details" component={TrapDetails} />
      <Stack.Group screenOptions={{}}>
        <Stack.Screen name="set" component={SetTrapScreen} />
        <Stack.Screen name="get" component={GetTrapScreen} />
      </Stack.Group>
      <Stack.Screen
        name="pick-bait-modal"
        component={PickBaitModal}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
