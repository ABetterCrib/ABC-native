/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import BleManager from './bluetooth'
import Api from './api';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function App() {

  const onChangeLight = (type) => {
    if (type === 'on')
      Api.lightOn().then((response) => response.json()).then((data) => console.log(data.msg)).catch((error) => console.log(error));
    else if (type === 'off')
      Api.lightOff().then((response) => response.json()).then((data) => console.log(data.msg)).catch((error) => console.log(error));
  }

  const onActivateBluetooth = async () => {
    console.log('Activating');
    BleManager.enableBluetooth()
    .then(() => {
      console.log('Bluetooth is enabled');
    })
    .catch((error) => {
      console.log("Blueooth is not enabled");
    });
    BleManager.start({ showAlert: false }).then(() => {
      console.log("Module initialized");
    });
    BleManager.scan([], 10, true).then(() => {
      console.log('Scan set to run for 10 seconds');
    });
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
      {LightControl(onChangeLight)}
      {bluetoothControl(onActivateBluetooth)}
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