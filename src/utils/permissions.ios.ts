import {requestAuthorization} from 'react-native-geolocation-service';

export const requestLocationPermissions = async () => {
  await requestAuthorization('whenInUse');
  return;
};
