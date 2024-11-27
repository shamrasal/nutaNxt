import { PermissionsAndroid, Platform } from 'react-native';

export const requestLocationAndWifiPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      console.log('Requesting permissions...');
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE,
      ]);

      console.log('Permission status:', granted);

      const allGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        console.error("Required permissions were not granted.");
        return false;
      }
      console.log("Permissions granted successfully.");
      return true;
    }
    return true; // No permission check required on iOS.
  } catch (error) {
    console.error("Error requesting permissions:", error);
    return false;
  }
};
