import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import {AppStateStatus, Platform} from 'react-native';
import {focusManager, QueryClient, QueryClientProvider} from 'react-query';
import {useDeviceContext} from 'twrnc';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import {useAppState} from './hooks/useAppState';
import {useOnlineManager} from './hooks/useOnlineManager';
import {MainNavigation} from './Navigation';
import {ColorSchemeProvider} from './utils/colorScheme';
import tw from './utils/tailwind';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZXJpeWMiLCJhIjoiY2ttNTUwenZiMGIyMDJvbXR6OTZuazdwNyJ9._NfBwvdZ_yuB-9xYX7phbg',
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const onAppStateChange = (status: AppStateStatus) => {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

const Entrypoint = () => {
  /* react-query online status */
  useOnlineManager();
  useAppState(onAppStateChange);

  /* twrnc color scheme  */
  useDeviceContext(tw, {withDeviceColorScheme: false});

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider>
        <MainNavigation />
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
};

export default Entrypoint;
