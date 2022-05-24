import React from 'react';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'ui';
import FlashMessage from 'react-native-flash-message';
import {RootNavigator} from 'navigation';
import {hydrateAuth, setI18nConfig} from 'core';
import APIProvider from 'api/api-provider';
import MapboxGL from '@rnmapbox/maps';

setI18nConfig();
hydrateAuth();

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZXJpeWMiLCJhIjoiY2ttNTUwenZiMGIyMDJvbXR6OTZuazdwNyJ9._NfBwvdZ_yuB-9xYX7phbg',
);

const App = () => {
  return (
    <APIProvider>
      <ThemeProvider>
        <RootNavigator />
        <FlashMessage position="top" />
      </ThemeProvider>
    </APIProvider>
  );
};

export default App;
