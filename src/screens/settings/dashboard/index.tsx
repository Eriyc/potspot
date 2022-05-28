import React from 'react';
import {getReadableVersion, getVersion} from 'react-native-device-info';

import {Text, View} from 'ui';
import {ListWidget} from './list-widget';

export const SettingsDashboardScreen = () => {
  return (
    <View>
      <ListWidget />
      <View flex={1} justifyContent="center">
        <Text>{getReadableVersion()}</Text>
      </View>
    </View>
  );
};
