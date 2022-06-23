import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CreateNewTrapScreen,
  GetTrapScreen,
  PickBaitModal,
  SetTrapScreen,
  TrapDetails,
  TrapOverviewScreen,
} from 'screens/trap';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  EditTrapDetailsScreen,
  renderEditButton,
} from 'screens/trap/edit-details';

export type TrapStackParamsList = {
  overview: undefined;
  details: {id: number};
  set: {id: number; bait?: number};
  get: {id: number};
  edit: {id: number; displayname?: string};
  create: undefined;
  'pick-bait-modal': {returnTo: keyof TrapStackParamsList; bait: number};
  'trap-list': undefined;
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
      <Stack.Screen
        name="details"
        component={TrapDetails}
        options={({route}) => ({
          title: 'Detaljer',
          headerRight: () => renderEditButton(route.params.id),
        })}
      />
      <Stack.Screen
        name="edit"
        component={EditTrapDetailsScreen}
        options={() => ({
          title: 'Redigera',
        })}
      />

      <Stack.Group screenOptions={{}}>
        <Stack.Screen
          name="set"
          component={SetTrapScreen}
          options={{title: 'Sätt tina'}}
        />
        <Stack.Screen
          name="get"
          component={GetTrapScreen}
          options={{title: 'Vittja tina'}}
        />
        <Stack.Screen
          name="create"
          component={CreateNewTrapScreen}
          options={{
            title: 'Skapa ny tina',
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="pick-bait-modal"
        component={PickBaitModal}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
