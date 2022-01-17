import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {AuthNavigation} from './features/account';
import {AppNavigation} from './features/app';
import {useMst} from '@/store';
import {useAuthState} from './utils/authListener';
import {ActivityIndicator, View} from 'react-native';
import tw from '@/utils/tailwind';

const MainNavigation = observer(() => {
  const {showSplash} = useAuthState();
  const {isLoggedIn} = useMst();

  if (showSplash) {
    return (
      <View style={tw`flex flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
});

export {MainNavigation};
