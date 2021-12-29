import React from 'react';

import tw, {useAppColorScheme, useDeviceContext} from 'twrnc';
import {MainNavigation} from './Navigation';
import {Provider, rootStore} from './store';

const Entrypoint = () => {
  // 1️⃣  opt OUT of listening to DEVICE color scheme events
  useDeviceContext(tw, {withDeviceColorScheme: false});
  useAppColorScheme(tw, 'light');

  return (
    <Provider value={rootStore}>
      <MainNavigation />
    </Provider>
  );
};

export default Entrypoint;
