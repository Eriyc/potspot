import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {FC, useCallback, useRef} from 'react';
import {Dimensions, FlatList, View, ViewToken} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import {useTailwind} from 'tailwind-rn/dist';

import {INITIAL_POS, Trap, useTraps} from '@/hooks/traps';
import {useLocationPermission} from '@/hooks/useLocationPermission';

import {CreateNewTrapButton, TrapMapCard} from '@/components';

import {useColorScheme} from '@/utils/colorScheme';

const handleError = (error: Error) => {
  console.log(error);
};

const openSeaMapTiles = {
  tileUrlTemplates: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
  tileSize: 256,
  id: 'openseamap',
};

export const MapScreen: FC = () => {
  const {data: traps} = useTraps();
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const [dark] = useColorScheme();
  const tw = useTailwind();

  const [locationGranted] = useLocationPermission();

  const handleScrollFinish = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length < 0) {
        const viewing: Trap = viewableItems[0].item;

        console.log(viewing.pos);

        cameraRef.current?.flyTo(viewing.pos.coordinates);
      }
    },
    [],
  );

  return (
    <View style={tw(`flex-1 bg-gray-700`)}>
      <ErrorBoundary onError={handleError}>
        <MapboxGL.MapView
          style={tw(`flex-1`)}
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
          {traps &&
            traps.map(trap => (
              <MapboxGL.PointAnnotation
                coordinate={trap.pos as unknown as [number, number]}
                id={`marker-${trap.id}-${dark.valueOf()}`}
                key={`marker-${trap.id}-${dark.valueOf()}`}>
                <View
                  style={tw(
                    `bg-pink-500 border-2 border-white h-4 rounded-full w-4`,
                  )}
                />
              </MapboxGL.PointAnnotation>
            ))}
        </MapboxGL.MapView>
        {
          <FlatList
            style={tw(`absolute bottom-0`)}
            contentContainerStyle={{
              padding: Dimensions.get('screen').width * 0.1,
            }}
            snapToAlignment="center"
            horizontal
            snapToInterval={Dimensions.get('screen').width * 0.85}
            decelerationRate="fast"
            ListFooterComponent={<CreateNewTrapButton />}
            data={traps}
            keyExtractor={({id}) => id.toString()}
            renderItem={({item}) => <TrapMapCard item={item} />}
            onViewableItemsChanged={handleScrollFinish}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
          />
        }
      </ErrorBoundary>
    </View>
  );
};
