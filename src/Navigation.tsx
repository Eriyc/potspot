import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';

import tw from '@/utils/tailwind';

import {AuthNavigation, useUser} from './features/account';
import {AppNavigation} from './features/app';

const MainNavigation = () => {
  const {isLoading, data} = useUser();
  const isLoggedIn = !!data?.id;

  if (isLoading) {
    return (
      <View style={tw`flex flex-1 justify-center items-center bg-white`}>
        <Image
          style={tw`max-w-full`}
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
