import {PermissionsAndroid} from 'react-native';

export const requestLocationPermissions = async () => {
  const coarse = await PermissionsAndroid.check(
    'android.permission.ACCESS_COARSE_LOCATION',
  );
  const fine = await PermissionsAndroid.check(
    'android.permission.ACCESS_FINE_LOCATION',
  );
  console.log(coarse, fine);

  if (coarse || fine) {
    return;
  }

  const status = await PermissionsAndroid.requestMultiple([
    'android.permission.ACCESS_COARSE_LOCATION',
    'android.permission.ACCESS_FINE_LOCATION',
  ]);

  if (
    status['android.permission.ACCESS_COARSE_LOCATION'] === 'denied' &&
    status['android.permission.ACCESS_FINE_LOCATION'] === 'denied'
  ) {
    throw new Error('Not granted');
  }
};
