import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import {MainNavigation} from './Navigation';
import {StoreProvider} from './store';
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
