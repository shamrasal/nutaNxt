package com.testproject

import android.content.Context
import android.net.wifi.WifiInfo
import android.net.wifi.WifiManager
import android.text.format.Formatter
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments

class HotspotManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val wifiManager: WifiManager =
        reactContext.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager

    override fun getName(): String {
        return "HotspotManager"
    }

    @ReactMethod
    fun getConnectedDevices(promise: Promise) {
        try {
            val connectedDevices = mutableListOf<String>()

            // Get the current connection info from WifiManager
            val wifiInfo: WifiInfo = wifiManager.connectionInfo

            // Get the current IP address of the connected device
            val ipAddress = Formatter.formatIpAddress(wifiInfo.ipAddress)

            // Add the IP address to the list (only one device connected)
            connectedDevices.add("IP Address: $ipAddress")

            // Convert the List to a WritableArray
            val writableArray = Arguments.createArray()
            for (device in connectedDevices) {
                writableArray.pushString(device)
            }

            // Resolve the promise with the WritableArray
            promise.resolve(writableArray)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to fetch connected devices: ${e.message}")
        }
    }
}
