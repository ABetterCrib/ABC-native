/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import Light from '../api/light';
import Controls from '../components/organisms/controls';
import Video from '../components/molecules/video';
import Heartbeat from '../components/organisms/heartbeat';
import Size from '../global/constants/size';
import user from '../api/user';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    NativeModules,
    NativeEventEmitter,
    Platform,
    PermissionsAndroid,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CornerSettings from '../components/atoms/cornerSetting';

import BleManager from 'react-native-ble-manager'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = (props) => {
   let peripherals = [];
   const [isScanning, setIsScanning] = useState(false);
   const [connectWith, setConnectWith] = useState('Wait...');
   const [update, setUpdate] = useState(true);
   const [bpm, setBpm] = useState(121);
   const [bpmAlert, setBpmAlert] = useState(!(bpm > user.getBpmLow() && bpm < user.getBpmHigh()));
   console.log(user.getBpmLow(), bpm, user.getBpmHigh());

    const handleDiscoverPeripheral = (peripheral) => {
        if (peripheral.name) {
            console.log('Got ble peripheral', peripheral.name, peripheral.id);
            peripherals.push([peripheral.name, peripheral.id]);
            setUpdate(!update);
        }
    }

    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    const handleConnect = (id) => {
        return BleManager.connect(id).then(() => {
            console.log("Connected");
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleStopScan = () => {
        console.log('Scan is stopped');
        let found = false;
        peripherals.forEach(periph => {
            if (!found && periph[0] == 'ABC') {
                console.log('connecting...');
                setConnectWith(periph[1]);
                handleConnect(periph[1]);
                found = true;
            }
        })
        console.log('finished checking peripherals');
        peripherals = [];
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
            Light.lightOn().then((response) => response.json()).then((data) => console.log(data.msg)).catch((error) => console.log(error));
        else if (type === 'off')
            Light.lightOff().then((response) => response.json()).then((data) => console.log(data.msg)).catch((error) => console.log(error));
    }

    const onActivateBluetooth = async () => {
        console.log('Activating');
        await BleManager.enableBluetooth()
        console.log('Bluetooth is enabled');
        await BleManager.start({ showAlert: false })
        console.log("Module initialized");
        await BleManager.scan([], 15, true)
        setIsScanning(true)
    }

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

    const colors = bpmAlert
        ? ['#D44646', '#8070E5', '#707CE5']
        : ['#8070E5', '#707CE5'];
    const locations = bpmAlert
        ? [0.2, 0.4, 1]
        : [0, 1];


    return (
        <>
        <Video />
        <LinearGradient colors={colors} locations={locations} style={styles.background}>
            <Heartbeat bpm={bpm} setAlert={setBpmAlert}/>
            <Controls/>
            <CornerSettings setScreen={props.setScreen}/>
        </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: Dimensions.get('window').height - Size.videoHeight
    },
    buttonText: {
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white'
    },
    colorBlue: {
        backgroundColor: 'blue'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightOff: {
        backgroundColor: 'black',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightOn: {
        backgroundColor: 'blue',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    margin: {
        margin: 10,
    },
});

export default Home;