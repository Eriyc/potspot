import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import Mapbox, {OnPressEvent, SymbolLayerStyle} from '@rnmapbox/maps';
import {MapBase, Pressable, Text, View, WIDTH} from 'ui';
import {TrapFeatureCollection, TrapFeatureType} from 'api/trap';
import {useMapState} from './map-state';
import {useNavigation} from '@react-navigation/native';
import {TrapNavigationProp} from 'navigation/trap-navigator';

const mapstyle = {flex: 1};

export const INITIAL_POS: [number, number] = [
  11.605112551760044, 57.637770511076575,
];
type TrapMapProps = {
  traps?: TrapFeatureCollection;
};

const SelectedPin = ({trap}: {trap: TrapFeatureType}) => {
  const navigation = useNavigation<TrapNavigationProp<'overview'>>();

  return (
    <Mapbox.MarkerView
      coordinate={trap.geometry.coordinates}
      id={`trap-${trap.id}`}>
      <View bg="white" width={WIDTH * 0.5}>
        <Pressable
          p="m"
          onPress={() =>
            navigation.navigate('details', {id: parseInt(trap.id!.toString())})
          }>
          <Text>{trap.properties.displayname}</Text>
        </Pressable>
      </View>
    </Mapbox.MarkerView>
  );
};

export const FullTrapMap = ({traps}: TrapMapProps) => {
  const mapState = useMapState();
  const camera = useRef<Mapbox.Camera>(null);

  useEffect(() => {
    camera.current?.setCamera({
      centerCoordinate: traps?.features.find(i => i.id == mapState.selectedTrap)
        ?.geometry.coordinates,
      animationDuration: 200,
      zoomLevel: 10,
    });
  }, [mapState.selectedTrap]);

  const handlePinPress = ({features}: OnPressEvent) => {
    const trap = features[0];
    const id = trap.id;

    if (!id) return;
    mapState.setSelectedTrap(parseInt(id.toString()));
  };

  const selectedTrap = useMemo(
    () => traps?.features?.find(t => t.id === mapState.selectedTrap)!,
    [mapState.selectedTrap],
  );

  const closeSelected = useCallback(() => {
    if (mapState.selectedTrap) {
      mapState.setSelectedTrap(null);
    }
  }, [mapState.selectedTrap]);

  return (
    <View flex={1}>
      <MapBase onPress={closeSelected} style={mapstyle}>
        <Mapbox.Camera
          ref={camera}
          defaultSettings={{centerCoordinate: INITIAL_POS, zoomLevel: 8}}
        />

        {traps && (
          <Mapbox.ShapeSource
            id="trap-locations"
            shape={traps}
            onPress={handlePinPress}>
            <Mapbox.SymbolLayer id="mapPinsLayer" style={markerStyle} />
          </Mapbox.ShapeSource>
        )}
        {mapState.selectedTrap && <SelectedPin trap={selectedTrap} />}
      </MapBase>
    </View>
  );
};

const markerStyle: SymbolLayerStyle = {
  iconAllowOverlap: true,
  iconAnchor: 'bottom',
  iconSize: 0.2,
  iconImage: require('../../../../assets/pin.png'),
};
