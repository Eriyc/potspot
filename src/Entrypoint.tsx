import 'react-native-url-polyfill/auto';
import React from 'react';

import {MainNavigation} from './Navigation';
import {StoreProvider} from './store';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {ColorSchemeProvider} from './utils/colorScheme';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZXJpeWMiLCJhIjoiY2ttNTUwenZiMGIyMDJvbXR6OTZuazdwNyJ9._NfBwvdZ_yuB-9xYX7phbg',
);

const Entrypoint = () => {
  return (
    <StoreProvider>
      <ColorSchemeProvider>
        <MainNavigation />
      </ColorSchemeProvider>
    </StoreProvider>
  );
};

export default Entrypoint;
