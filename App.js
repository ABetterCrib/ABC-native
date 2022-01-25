/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import Api from './api';
import Diagnostics from './components/molecules/diagnostics';
import Controls from './components/molecules/controls';
import Header from './components/molecules/header'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid
} from 'react-native';

import BleManager from 'react-native-ble-manager'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function App() {
  const [peripherals, setPeripherals] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleDiscoverPeripheral = (peripheral) => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    setPeripherals(peripherals.push(peripheral));
  }

  const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    peripherals.forEach(periph => {
      if (periph.name !== 'NO NAME') console.log(periph.name)
      if (periph.id === 'b8:27:eb:68:3d:50' || periph.id ===  'b8:27:eb:3d:68:05') console.log('-----here------', periph.name);
    })
    setIsScanning(false);
  }

  const handleDisconnectedPeripheral = (data) => {
    console.log('Disconnected from ' + data.peripheral);
  }

  useEffect(() => {
    BleManager.start({showAlert: false});

    const subscription1 = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    const subscription2 = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    const subscription3 = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    const subscription4 = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }

    return (() => {
      console.log('unmount');
      subscription1.remove();
      subscription2.remove();
      subscription3.remove();
      subscription4.remove();
    })
  }, []);

  const onChangeLight = (type) => {
    if (type === 'on')
      Api.lightOn().then((response) => response.json()).then((data) => console.log(data.msg)).catch((error) => console.log(error));
    else if (type === 'off')
      Api.lightOff().then((response) => response.json()).then((data) => console.log(data.msg)).catch((error) => console.log(error));
  }

  const onActivateBluetooth = async () => {
    console.log('Activating');
    await BleManager.enableBluetooth()
    console.log('Bluetooth is enabled');
    await BleManager.start({ showAlert: false })
    console.log("Module initialized");
    await BleManager.scan([], 40, true)
    setIsScanning(true)
  }

  const LightControl = ( onPress ) => {
    return (
      <View style={[styles.container]}>
        <View style={[styles.margin]}>
          <TouchableOpacity
            onPress={() => onPress('on')}
            style={[styles.lightOn]}
          >
            <Text style={styles.buttonText}>Light on</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.margin]}>
          <TouchableOpacity
            onPress={() => onPress('off')}
            style={[styles.lightOff]}
          >
            <Text style={styles.buttonText}>Light off</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  const bluetoothControl = ( onPress ) => {
    return (
      <View style={[styles.margin]}>
          <TouchableOpacity
            onPress={onPress}
            style={[styles.lightOn]}
          >
            <Text style={styles.buttonText}>Bluetooth</Text>
          </TouchableOpacity>
        </View>
    )
  }

  return (
    <>
      <Header />
      <Controls />
      <Diagnostics />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: {
    margin: 10,
  },
  lightOn: {
    backgroundColor: 'blue',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOff: {
    backgroundColor: 'black',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBlue: {
    backgroundColor: 'blue'
  },
  buttonText: {
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white'
  }
});