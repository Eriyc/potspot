import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {AuthNavigation} from './features/account';
import {useMst} from './store';
import {Text} from 'react-native';

const MainNavigation = observer(() => {
  const {user} = useMst();

  console.log(user);

  return (
    <NavigationContainer>
      <Text>{user.id}</Text>
      <AuthNavigation />
    </NavigationContainer>
  );
});

export {MainNavigation};
