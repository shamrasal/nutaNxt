import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert, Dimensions } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const BluetoothToggle = () => {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);

  useEffect(() => {
    // Initialize BleManager on component mount
    BleManager.start({ showAlert: false })
      .then(() => console.log('BleManager initialized'))
      .catch((error) => console.error('Initialization error', error));
  }, []);

  const requestBluetoothPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
          : PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL;

      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  const toggleBluetooth = async (value: boolean) => {
    const hasPermission = await requestBluetoothPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please grant Bluetooth permissions to proceed.');
      return;
    }

    if (value) {
      try {
        await BleManager.enableBluetooth();
        setIsBluetoothEnabled(true);
        Alert.alert('Bluetooth Enabled', 'Bluetooth has been turned on successfully.');
      } catch (error) {
        console.error('Bluetooth enable error:', error);
        Alert.alert('Error', 'Failed to turn on Bluetooth.');
        setIsBluetoothEnabled(false);
      }
    } else {
      // Note: Turning Bluetooth off programmatically is restricted on most platforms
      Alert.alert(
        'Info',
        'Bluetooth cannot be turned off programmatically. Please turn it off manually in your device settings.'
      );
      setIsBluetoothEnabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Toggle</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {isBluetoothEnabled ? 'Bluetooth is ON' : 'Bluetooth is OFF'}
        </Text>
        <Switch
          value={isBluetoothEnabled}
          onValueChange={toggleBluetooth}
          thumbColor={isBluetoothEnabled ? '#007AFF' : '#ccc'}
          trackColor={{ false: '#ddd', true: '#81b0ff' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default BluetoothToggle;
