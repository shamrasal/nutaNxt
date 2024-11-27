import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getConnectedDevices } from '../HotspotManagerBridge'; // Adjust the path as per your project
import { requestLocationAndWifiPermissions } from '../RequestLocationPermission';
const HotspotConnections = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDevices = async () => {
    setIsLoading(true);
    const hasPermission = await requestLocationAndWifiPermissions();
    if (!hasPermission) {
      console.error("Location permission is required to fetch connected devices.");
      // return [];
    }
    const connectedDevices = await getConnectedDevices();
    setDevices(connectedDevices);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity title="Fetch Connected Devices" onPress={fetchDevices} style={styles.touchable} disabled={isLoading}>
        {
          isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
          ) : (
            <Text style={styles.touchableTitle}>Fetch Connected Devices</Text>
          )
        }
      </TouchableOpacity>
      <Text style={styles.title}>Connected Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.ipBlock}>
            <Text style={styles.device}>{`${index + 1}]`} </Text>
            <Text style={styles.device}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // padding: 20,
    paddingVertical: 40,
    width: '80%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  touchableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  device: {
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 'bold',

  },
  touchable: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  ipBlock: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default HotspotConnections;
