import MapboxGL from '@rnmapbox/maps';
import React from 'react';
import {MapBase, View} from 'ui';

type DetailsMapWidgetProps = {
  coordinates: [number, number];
};
export const DetailsMapWidget = ({coordinates}: DetailsMapWidgetProps) => {
  return (
    <MapBase style={mapStyle}>
      <MapboxGL.Camera
        defaultSettings={{centerCoordinate: coordinates, zoomLevel: 11}}
      />
      <MapboxGL.PointAnnotation coordinate={coordinates} id="trap-position">
        <View
          style={{
            backgroundColor: '#ec4899',
            borderWidth: 2,
            borderColor: 'white',
            height: 16,
            width: 16,
            borderRadius: 1000,
          }}
        />
      </MapboxGL.PointAnnotation>
    </MapBase>
  );
};

const mapStyle = {
  height: 220,
};
