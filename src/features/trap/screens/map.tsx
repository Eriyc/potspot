import MapboxGL from '@react-native-mapbox-gl/maps';
import {observer} from 'mobx-react-lite';
import React, {FC, useRef} from 'react';
import {FlatList, View} from 'react-native';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {INITIAL_POS} from '..';
import {CreateNewTrapButton} from '../components';

const openSeaMapTiles = {
  tileUrlTemplates: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
  tileSize: 256,
  id: 'openseamap',
};

export const MapScreen: FC = observer(() => {
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const [dark] = useColorScheme();

  return (
    <View style={tw`flex-1 bg-gray-700`}>
      <MapboxGL.MapView
        style={tw`flex-1`}
        styleURL={
          dark
            ? 'mapbox://styles/mapbox/dark-v9'
            : 'mapbox://styles/mapbox/satellite-v9'
        }>
        <MapboxGL.UserLocation />
        <MapboxGL.Camera
          ref={cameraRef}
          defaultSettings={{centerCoordinate: INITIAL_POS, zoomLevel: 8}}
          maxZoomLevel={13}
        />
        <MapboxGL.RasterSource {...openSeaMapTiles}>
          <MapboxGL.RasterLayer id="openseamapLayer" sourceID="openseamap" />
        </MapboxGL.RasterSource>
      </MapboxGL.MapView>
      <FlatList
        style={tw`absolute bottom-0 p-4`}
        horizontal
        ListHeaderComponent={<CreateNewTrapButton />}
        data={[]}
        renderItem={() => <View />}
      />
    </View>
  );
});
