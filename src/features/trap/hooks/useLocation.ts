import {Position} from 'geojson';
import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

import {useLocationPermission} from '@/hooks/useLocationPermission';

import {INITIAL_POS} from '..';

export const useLocation = (): [Position, boolean | undefined] => {
  const [isMounted, setIsMounted] = useState(false);
  const [userLocation, setUserLocation] =
    useState<[number, number]>(INITIAL_POS);

  const [granted] = useLocationPermission();

  useEffect(() => {
    let watchId: number;

    const getPosition = async () => {
      Geolocation.getCurrentPosition(
        info => {
          if (isMounted) {
            setUserLocation([info.coords.longitude, info.coords.latitude]);
          }
        },
        console.error,
        {enableHighAccuracy: true, timeout: 15000},
      );

      watchId = Geolocation.watchPosition(
        info => {
          if (isMounted) {
            setUserLocation([info.coords.longitude, info.coords.latitude]);
          }
        },
        console.error,
        {useSignificantChanges: true, enableHighAccuracy: true},
      );
    };

    if (granted) {
      getPosition();
    }
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [isMounted, granted]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return [userLocation, granted];
};
