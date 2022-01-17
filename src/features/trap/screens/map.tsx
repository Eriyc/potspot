import React, {FC, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {FlatList, View} from 'react-native';
import tw from '@/utils/tailwind';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {CreateNewTrapButton} from '../components';
import {useColorScheme} from '@/utils/colorScheme';

const INITIAL_POS: [number, number] = [11.605112551760044, 57.637770511076575];

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
        renderItem={() => <View></View>}
      />
    </View>
  );
});
