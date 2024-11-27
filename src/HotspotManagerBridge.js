import { NativeModules } from 'react-native';
const { HotspotManager } = NativeModules;

export const getConnectedDevices = async () => {
  try {
    // Call the native module method
    const devices = await HotspotManager.getConnectedDevices();
    
    if (devices && Array.isArray(devices)) {
      if (devices.length === 0) {
        console.log("No connected devices found.");
      } else {
        console.log("Connected devices:", devices);
      }
      return devices;
    } else {
      console.error("Unexpected response from native module:", devices);
      return [];
    }
  } catch (error) {
    console.error('Error fetching connected devices getConnectedDevices :', error);
    return [];
  }
};
