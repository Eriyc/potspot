import MapboxGL from '@react-native-mapbox-gl/maps';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback, useRef} from 'react';
import {Dimensions, FlatList, View, ViewToken} from 'react-native';

import {useLocationPermission} from '@/hooks/useLocationPermission';

import {useMst} from '@/store';
import {ITrap} from '@/store/types';
import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {INITIAL_POS} from '..';
import {CreateNewTrapButton, TrapMapCard} from '../components';

const openSeaMapTiles = {
  tileUrlTemplates: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
  tileSize: 256,
  id: 'openseamap',
};

export const MapScreen: FC = observer(() => {
  const {trapStore} = useMst();
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const [dark] = useColorScheme();

  const [locationGranted] = useLocationPermission();

  const handleScrollFinish = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length < 0) {
        const viewing: ITrap = viewableItems[0].item;

        cameraRef.current?.flyTo(viewing.pos);
      }
    },
    [],
  );

  return (
    <View style={tw`flex-1 bg-gray-700`}>
      <MapboxGL.MapView
        style={tw`flex-1`}
        styleURL={
          dark
            ? 'mapbox://styles/mapbox/dark-v9'
            : 'mapbox://styles/mapbox/satellite-v9'
        }>
        {locationGranted && <MapboxGL.UserLocation />}
        <MapboxGL.Camera
          ref={cameraRef}
          defaultSettings={{centerCoordinate: INITIAL_POS, zoomLevel: 8}}
          maxZoomLevel={13}
        />
        <MapboxGL.RasterSource {...openSeaMapTiles}>
          <MapboxGL.RasterLayer id="openseamapLayer" sourceID="openseamap" />
        </MapboxGL.RasterSource>
        {trapStore.traps.map(trap => (
          <MapboxGL.PointAnnotation
            coordinate={trap.pos}
            id={`marker-${trap.id}-${dark.valueOf()}`}
            key={`marker-${trap.id}-${dark.valueOf()}`}>
            <View
              style={tw`w-4 h-4 bg-pink-500 rounded-full border-2 border-white`}
            />
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>
      <FlatList
        style={tw`absolute bottom-0`}
        contentContainerStyle={tw`p-[10%]`}
        snapToAlignment="center"
        horizontal
        snapToInterval={Dimensions.get('screen').width * 0.85}
        decelerationRate="fast"
        ListFooterComponent={<CreateNewTrapButton />}
        data={trapStore.traps}
        keyExtractor={({id}) => id.toString()}
        renderItem={({item}) => <TrapMapCard item={item as ITrap} />}
        onViewableItemsChanged={handleScrollFinish}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
      />
    </View>
  );
});
