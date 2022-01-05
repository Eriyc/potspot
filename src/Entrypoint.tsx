import 'react-native-url-polyfill/auto';
import React from 'react';

import tw, {useAppColorScheme, useDeviceContext} from 'twrnc';
import {MainNavigation} from './Navigation';
import {StoreProvider} from './store';

const Entrypoint = () => {
  // 1️⃣  opt OUT of listening to DEVICE color scheme events
  useDeviceContext(tw, {withDeviceColorScheme: false});
  useAppColorScheme(tw, 'light');

  return (
    <StoreProvider>
      <MainNavigation />
    </StoreProvider>
  );
};

export default Entrypoint;
