import MapboxGL, {Logger} from '@rnmapbox/maps';
import {useLocation} from 'core/use-location';
import React, {PropsWithChildren, useEffect} from 'react';
import {LogBox, ViewStyle} from 'react-native';

type MapBaseProps = PropsWithChildren<{
  style?: ViewStyle;
  onPress?: (
    feature: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>,
  ) => void;
  onRegionDidChange?: (
    feature: GeoJSON.Feature<GeoJSON.Point, MapboxGL.RegionPayload>,
  ) => void;
}>;

LogBox.ignoreLogs([
  'Failed to load tile',
  'Request failed due to a permanent error:',
]);

const rasterSourceProps = {
  id: 'stamenWatercolorSource',
  tileUrlTemplates: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
  tileSize: 256,
};

export const MapBase = ({children, onPress, style, onRegionDidChange}: MapBaseProps) => {
  const [_, granted] = useLocation();

  useEffect(() => {
    return () => {
      console.log('unmounting');
    };
  }, []);

  return (
    <MapboxGL.MapView
      style={style}
      onPress={onPress}
      styleURL={MapboxGL.StyleURL.SatelliteStreet}
      onRegionDidChange={onRegionDidChange}>
      {granted && <MapboxGL.UserLocation />}
      <MapboxGL.RasterSource {...rasterSourceProps}>
        <MapboxGL.RasterLayer
          id="stamenWatercolorLayer"
          sourceID={rasterSourceProps.id}
          style={{rasterOpacity: 1}}
        />
      </MapboxGL.RasterSource>

      {children}
    </MapboxGL.MapView>
  );
};
