import MapboxGL, {RegionPayload} from '@react-native-mapbox-gl/maps';
import {Feature, Point} from 'geojson';
import React, {useMemo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Lock, Navigation, Unlock} from 'react-native-feather';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

type LocationChangeHandler = (feature: Feature<Point, RegionPayload>) => void;

export const PickLocationMap = () => {
  const [dark] = useColorScheme();
  const [locked, setLocked] = useState(false);
  const iconStyle = useMemo(
    () => tw.style('text-gray-500', dark && 'text-gray-100'),
    [dark],
  );

  const onLocationChange: LocationChangeHandler = feature => {};

  return (
    <>
      <View style={tw`h-[30vh] relative rounded-sm`}>
        <MapboxGL.MapView
          style={tw`flex-1`}
          onRegionDidChange={onLocationChange}
        />
        <Pressable
          onPress={() => setLocked(l => !l)}
          style={tw.style(
            'bg-gray-200 rounded-md p-2 top-1 right-1 absolute',
            dark && 'bg-gray-700 active:bg-gray-500',
          )}>
          {locked ? <Lock style={iconStyle} /> : <Unlock style={iconStyle} />}
        </Pressable>
      </View>
      <Pressable
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
    </>
  );
};
