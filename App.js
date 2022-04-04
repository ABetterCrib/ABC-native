// Run android with "npx react-native run-android"

import React, { useState, useEffect } from 'react';
import Home from './screens/home.screen';
import Welcome from './screens/welcome.screen';
import Settings from './screens/settings.screen';
import Video from 'react-native-video';
import BASE_IP from './api/ip';

import { NativeModules, NativeEventEmitter, Platform, PermissionsAndroid, } from 'react-native';
import BleManager from 'react-native-ble-manager'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function App() {

  const [screen, setScreen] = useState('Welcome');
  const [isScanning, setIsScanning] = useState(false);
  const [connectWith, setConnectWith] = useState(null);

  const handleDiscoverPeripheral = (peripheral) => {
    if (peripheral.name) {
      console.log('Got ble peripheral', peripheral.name, peripheral.id);
      if (connectWith === null && peripheral.name === 'ABC') {
        console.log('connecting...');
        setConnectWith(peripheral[1]);
        handleConnect(peripheral[1]);
        setIsScanning(false);
      }
    }
  }

  const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const handleConnect = async (id) => {
    return BleManager.connect(id).then(() => {
      console.log("Connected");
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleStopScan = () => {
    console.log('Scanning stopped');
    setIsScanning(false);
  }

  const handleDisconnectedPeripheral = (data) => {
    console.log('Disconnected from ' + data.peripheral);
  }

  const onActivateBluetooth = async () => {
    console.log('Activating');
    await BleManager.enableBluetooth();
    console.log('Bluetooth is enabled');
    await BleManager.start({ showAlert: false });
    console.log("Module initialized");
    setIsScanning(true);
    await BleManager.scan([], 60, true);
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

  const getScreen = () => {
    if (screen === 'Welcome') {
      return (
        <Welcome setScreen={setScreen}/>
      )
    }
    if (screen === 'Home') {
      return (
        <Home setScreen={setScreen}/>
      )
    }
    if (screen === 'Settings') {
      return (
        <Settings
          setScreen={setScreen}
          bluetooth={onActivateBluetooth}
          scanning={isScanning}
          connected={connectWith !== null}
        />
      )
    }
  }

  return (
    <>
      {getScreen()}
      <Video
        source={{uri: BASE_IP.concat(':8888/out.mp3')}}   // Can be a URL or a local file.
        audioOnly={true}
        poster={'https://scontent-ort2-2.xx.fbcdn.net/v/t39.30808-1/225517274_1985200158304924_7680111137912694149_n.jpg?stp=c0.0.320.320a_dst-jpg_p320x320&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=LLDG2A7mlFIAX8dgRrj&_nc_ht=scontent-ort2-2.xx&oh=00_AT9H4iWsNGaPeAVietuAdvQgZei6JaSHazoEGySrxTSnpw&oe=624D79DD'}
        style={{height: 0, width: 0}}
        onError={() => alert('Error connecting to '.concat(BASE_IP).concat(':8888/out.mp3'))}
        onLoad={(payload) => alert('Loaded')}
        muted={screen !== 'Home'}
      />
    </>
  );
}