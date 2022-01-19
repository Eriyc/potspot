import {Position} from 'geojson';
import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

import {requestLocationPermissions} from '@/utils/permissions';

import {INITIAL_POS} from '..';

export const useLocation = (): [Position, boolean | undefined] => {
  const [userLocationAllowed, setUserLocationAllowed] = useState<
    boolean | undefined
  >(undefined);
  const [userLocation, setUserLocation] =
    useState<[number, number]>(INITIAL_POS);

  useEffect(() => {
    let watchId: number;

    const getPosition = async () => {
      await requestLocationPermissions().catch(() =>
        setUserLocationAllowed(false),
      );
      watchId = Geolocation.watchPosition(
        info => {
          setUserLocation([info.coords.longitude, info.coords.latitude]);
          setUserLocationAllowed(true);
        },
        console.error,
        {useSignificantChanges: true},
      );
    };

    getPosition();
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return [userLocation, userLocationAllowed];
};
