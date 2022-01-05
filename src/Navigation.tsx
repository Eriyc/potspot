import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {AuthNavigation} from './features/account';
import {AppNavigation} from './features/app';
import {useMst} from '@/store';

const MainNavigation = observer(() => {
  const {isLoggedIn} = useMst();

  /* if (user.status === 'pending') {
    return (
      <View style={tw`flex flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  } */

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
});

export {MainNavigation};
