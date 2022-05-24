import React from 'react';
import {MapView, Camera} from '@rnmapbox/maps';
import {View} from 'ui';

const mapstyle = {flex: 1};

export const FullTrapMap = () => {
  return (
    <View flex={1}>
      <MapView style={mapstyle}>
        <Camera />
      </MapView>
    </View>
  );
};
