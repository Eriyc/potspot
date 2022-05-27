import MapboxGL from '@rnmapbox/maps';
import {useLocation} from 'core/use-location';
import React, {PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';

type MapBaseProps = PropsWithChildren<{
  style?: ViewStyle;
  onPress?: (
    feature: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>,
  ) => void;
}>;

const openSeaMapTiles = {
  tileUrlTemplates: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
  tileSize: 256,
  id: 'openseamap',
};

export const MapBase = ({children, onPress, style}: MapBaseProps) => {
  const [_, granted] = useLocation();

  return (
    <MapboxGL.MapView
      onPress={onPress}
      style={style}
      styleURL="mapbox://styles/mapbox/satellite-v9">
      {granted && <MapboxGL.UserLocation />}
      <MapboxGL.RasterSource {...openSeaMapTiles}>
        <MapboxGL.RasterLayer id="openseamapLayer" sourceID="openseamap" />
      </MapboxGL.RasterSource>

      {children}
    </MapboxGL.MapView>
  );
};
