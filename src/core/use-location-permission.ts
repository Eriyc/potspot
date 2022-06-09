import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  checkMultiple,
  Permission,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';

type PlatformPerm = Record<'ios' | 'android', Permission[]>;

const platformPerm: PlatformPerm = {
  ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
  android: [
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ],
};

export const useLocationPermission = () => {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const os = Platform.OS === 'ios' ? 'ios' : 'android';

    const checkPermission = async () => {
      let status = await checkMultiple(platformPerm[os]);

      if (os === 'ios') {
        if (
          status['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted' ||
          status['ios.permission.LOCATION_WHEN_IN_USE'] === 'limited'
        ) {
          return setGranted(true);
        }
      } else {
        if (
          status['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' ||
          status['android.permission.ACCESS_COARSE_LOCATION'] === 'limited' ||
          status['android.permission.ACCESS_FINE_LOCATION'] === 'granted' ||
          status['android.permission.ACCESS_FINE_LOCATION'] === 'limited'
        ) {
          return setGranted(true);
        }
      }

      status = await requestMultiple(platformPerm[os]);

      if (os === 'ios') {
        if (
          status['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted' ||
          status['ios.permission.LOCATION_WHEN_IN_USE'] === 'limited'
        ) {
          return setGranted(true);
        }
      } else {
        if (
          status['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' ||
          status['android.permission.ACCESS_COARSE_LOCATION'] === 'limited' ||
          status['android.permission.ACCESS_FINE_LOCATION'] === 'granted' ||
          status['android.permission.ACCESS_FINE_LOCATION'] === 'limited'
        ) {
          return setGranted(true);
        }
      }
    };

    checkPermission();
  }, []);

  return [granted];
};
