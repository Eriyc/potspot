import MapboxGL from '@rnmapbox/maps';
import {useLocation} from 'core/use-location';
import React, {useRef, useState} from 'react';
import {ViewStyle} from 'react-native';
import {Crosshair} from 'react-native-feather';
import {INITIAL_POS, MapBase, Pressable, Text, useTheme, View, WIDTH} from 'ui';

type MapPositionWidgetProps = {
  initialCoordinates?: [number, number];
  onPositionChanged?: (pos: [number, number]) => void;
};

export const MapPositionWidget = (props: MapPositionWidgetProps) => {
  const [userLocation, locationGranted] = useLocation();
  const [mapLocation, setMapLocation] = useState(
    props.initialCoordinates || INITIAL_POS,
  );
  const camera = useRef<MapboxGL.Camera>(null);

  const theme = useTheme();

  const handlePositionChanged = (pos: [number, number]) => {
    props.onPositionChanged?.(pos);
    setMapLocation(pos);
  };

  const setUserLocation = () => {
    if (!locationGranted) return;
    if (!camera.current) return;
    handlePositionChanged(userLocation as [number, number]);
    camera.current.setCamera({
      animationDuration: 400,
      centerCoordinate: userLocation,
      zoomLevel: 8,
      heading: 0,
    });
  };

  return (
    <View>
      <View paddingHorizontal="l">
        <Text variant="header">Välj plats</Text>
      </View>
      <View height={250} justifyContent="center" alignItems="center">
        <MapBase
          style={mapStyle}
          onRegionDidChange={p =>
            handlePositionChanged(p.geometry.coordinates as [number, number])
          }>
          <MapboxGL.Camera
            ref={camera}
            defaultSettings={{
              centerCoordinate: mapLocation,
              zoomLevel: 8,
            }}
          />
          {props.initialCoordinates && (
            <MapboxGL.PointAnnotation
              coordinate={props.initialCoordinates}
              id="trap-position">
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
          )}
        </MapBase>
        <View
          position="absolute"
          bg="red"
          borderRadius={100}
          height={10}
          width={10}
        />
      </View>

      <View m="m" borderWidth={1} borderRadius={4} overflow="hidden">
        <Pressable
          onPress={setUserLocation}
          p="m"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          android_ripple={{borderless: true, color: theme.colors.grey3}}>
          <Crosshair color={theme.colors.text} />
          <Text ml="s">Eller använd din nuvarande plats</Text>
        </Pressable>
      </View>
    </View>
  );
};

const mapStyle: ViewStyle = {
  flex: 1,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
};
