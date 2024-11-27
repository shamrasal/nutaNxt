import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import BluetoothToggle from './src/BlutoothToggle/BluetoothToggle'
import HotspotConnections from './src/HotspotUsers/HotspotConnections'

export default function App() {
  return (
    <View style={styles.root}>
      <BluetoothToggle />
      <View style={styles.gap} />
      <HotspotConnections />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 40
  },
  gap: {
    height: 70
  }
})