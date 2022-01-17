import 'react-native-url-polyfill/auto';
import React from 'react';

import tw from '@/utils/tailwind';
import {useAppColorScheme, useDeviceContext} from 'twrnc';
import {MainNavigation} from './Navigation';
import {StoreProvider} from './store';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZXJpeWMiLCJhIjoiY2ttNTUwenZiMGIyMDJvbXR6OTZuazdwNyJ9._NfBwvdZ_yuB-9xYX7phbg',
);

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
