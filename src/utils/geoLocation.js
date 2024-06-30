import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('always');
  } else {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Permission',
        message: 'We need access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  }
};

export const getCurrentLocation = () => {
  requestLocationPermission().then(() => {
    Geolocation.getCurrentPosition(
      position => {
        const locationDetails = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        return locationDetails;
      },
      error => {
        throw error;
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  });
};
