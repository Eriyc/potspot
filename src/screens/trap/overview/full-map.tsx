import React, {useRef} from 'react';
import Mapbox, {OnPressEvent, SymbolLayerStyle} from '@rnmapbox/maps';
import {View} from 'ui';
import {TrapFeatureCollection} from 'api/trap';
import {useMapState} from './map-state';

const mapstyle = {flex: 1};

const openSeaMapTiles = {
  tileUrlTemplates: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
  tileSize: 256,
  id: 'openseamap',
};

export const INITIAL_POS: [number, number] = [
  11.605112551760044, 57.637770511076575,
];
type TrapMapProps = {
  traps?: TrapFeatureCollection;
};

export const FullTrapMap = ({traps}: TrapMapProps) => {
  const mapState = useMapState();
  const camera = useRef;

  const handlePinPress = ({features}: OnPressEvent) => {
    const trap = features[0];
    const id = trap.id;

    if (!id || typeof id !== 'number') return;
    mapState.setSelectedTrap(id);
  };

  return (
    <View flex={1}>
      <Mapbox.MapView
        styleURL="mapbox://styles/mapbox/satellite-v9"
        style={mapstyle}
        onDidFinishRenderingMap={() => console.log('rendered')}
        onDidFinishLoadingMap={() => console.log('loaded')}
        onWillStartLoadingMap={() => console.log('start loading')}
        onWillStartRenderingMap={() => console.log('start render')}>
        <Mapbox.Camera
          defaultSettings={{centerCoordinate: INITIAL_POS, zoomLevel: 8}}
        />
        <Mapbox.UserLocation />
        <Mapbox.RasterSource {...openSeaMapTiles}>
          <Mapbox.RasterLayer id="openseamapLayer" sourceID="openseamap" />
        </Mapbox.RasterSource>
        {traps && (
          <Mapbox.ShapeSource
            id="trap-locations"
            shape={traps}
            onPress={handlePinPress}>
            <Mapbox.SymbolLayer id="mapPinsLayer" style={markerStyle} />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>
    </View>
  );
};

const markerStyle: SymbolLayerStyle = {
  iconAllowOverlap: true,
  iconAnchor: 'bottom',
  iconSize: 0.2,
  iconImage: require('../../../../assets/pin.png'),
};
