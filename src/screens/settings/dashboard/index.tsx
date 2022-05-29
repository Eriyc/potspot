import React from 'react';
import {getVersion} from 'react-native-device-info';

import {Text, View} from 'ui';
import {ListWidget} from './list-widget';

export const SettingsDashboardScreen = () => {
  return (
    <View>
      <ListWidget />
      <View alignItems="center">
        <Text color="grey3">{getVersion().toString()}</Text>
      </View>
    </View>
  );
};
