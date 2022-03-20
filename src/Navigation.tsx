import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {useUser} from './hooks/account';
import {AppNavigation} from './navigation/app-navigation';
import {AuthNavigation} from './navigation/auth-navigation';

const MainNavigation = () => {
  const {isLoading, data} = useUser();
  const tw = useTailwind();
  const isLoggedIn = !!data?.id;

  if (isLoading) {
    return (
      <View style={tw(`bg-white flex flex-1 items-center justify-center`)}>
        <Image
          style={tw(`max-w-full`)}
          resizeMode="contain"
          source={require('@/assets/logo-black.png')}
        />
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export {MainNavigation};
