import MapboxGL, {RegionPayload} from '@react-native-mapbox-gl/maps';
import {Feature, Point} from 'geojson';
import React, {FC, Fragment, useMemo, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Lock, Navigation, Unlock} from 'react-native-feather';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {useLocation} from '../hooks/useLocation';

export type LocationChangeHandler = (
  feature: Feature<Point, RegionPayload>,
) => void;

export interface PickLocationMapProps {
  onLocationChange: (point: [number, number]) => void;
}

export const PickLocationMap: FC<PickLocationMapProps> = ({
  onLocationChange,
}) => {
  const [dark] = useColorScheme();
  const [userLocation, locationGranted] = useLocation();

  const camera = useRef<MapboxGL.Camera>(null);
  const map = useRef<MapboxGL.MapView>(null);

  const [locked, setLocked] = useState(false);
  const iconStyle = useMemo(
    () => tw.style('text-gray-500', dark && 'text-gray-100'),
    [dark],
  );

  const handleLocationChange: LocationChangeHandler = feature => {
    onLocationChange([
      feature.geometry.coordinates[0],
      feature.geometry.coordinates[1],
    ]);
  };

  const moveToUser = () => {
    console.log(userLocation, camera.current);
    camera.current?.setCamera({
      centerCoordinate: userLocation,
      animationDuration: 1000,
      zoomLevel: 11,
      animationMode: 'easeTo',
    });
  };

  return (
    <Fragment>
      <View style={tw`relative`}>
        <View
          style={tw`h-[30vh] rounded-sm`}
          pointerEvents={locked ? 'none' : 'auto'}>
          <MapboxGL.MapView
            styleURL={
              dark
                ? 'mapbox://styles/mapbox/dark-v9'
                : 'mapbox://styles/mapbox/satellite-v9'
            }
            ref={map}
            style={tw`flex-1`}
            onRegionDidChange={handleLocationChange}>
            {locationGranted && <MapboxGL.UserLocation />}
            <MapboxGL.Camera
              ref={camera}
              defaultSettings={{
                zoomLevel: 9,
                centerCoordinate: userLocation,
              }}
            />
          </MapboxGL.MapView>
        </View>
        <Pressable
          onPress={() => setLocked(l => !l)}
          style={tw.style(
            'bg-gray-200 rounded-md p-2 top-1 right-1 absolute',
            dark && 'bg-gray-700 active:bg-gray-500',
          )}>
          {locked ? <Lock style={iconStyle} /> : <Unlock style={iconStyle} />}
        </Pressable>
      </View>
      {locationGranted && (
        <Pressable
          disabled={locked}
          onPress={moveToUser}
          style={tw.style(
            'bg-gray-200 my-2 p-2 rounded-sm flex flex-row items-center justify-center',
            dark && 'bg-gray-700',
          )}>
          <Navigation
            style={tw.style('text-gray-500 mr-2', dark && 'text-gray-100')}
          />
          <Text
            style={tw.style('text-gray-500 text-lg', dark && 'text-gray-100')}>
            Vid min plats
          </Text>
        </Pressable>
      )}
    </Fragment>
  );
};
