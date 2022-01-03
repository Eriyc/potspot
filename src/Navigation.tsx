import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import tw from 'twrnc';
import {AuthNavigation} from './features/account';
import {AppNavigation} from './features/app';
import {useMst} from './store';

const MainNavigation = observer(() => {
  const {user} = useMst();

  useEffect(() => {
    user.checkStatus().then(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.status === 'pending') {
    return (
      <View style={tw`flex flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user.id ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
});

export {MainNavigation};
