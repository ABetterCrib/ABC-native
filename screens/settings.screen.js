import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import Back from '../components/atoms/back';
import Colors from '../global/styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = (props) => {
    const [triedBluetooth, setTriedBluetooth] = useState(false);

    const logout = async () => {
        await AsyncStorage.removeItem('LOGIN');
        props.setScreen('Welcome');
    }

    const connectToCrib = async () => {
        await props.bluetooth();
        setTriedBluetooth(true);
    }

    return (
        <LinearGradient style={styles.container} colors={['#5477D4', '#2B2385']}>
            <Text style={styles.header}>Settings</Text>
            <View style={styles.headerBar}/>
            <TouchableOpacity style={styles.list} onPress={() => logout()}>
                <Text style={styles.listText}>Log out</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.list} onPress={() => connectToCrib()}>
                    <Text style={styles.listText}>Connect to crib</Text>
                </TouchableOpacity>
                {props.scanning && <ActivityIndicator size={'large'} style={{marginTop: 30, marginLeft: 20}}/>}
                {!props.scanning && props.connected && <Text style={styles.connectSuccess}>Connected</Text>}
                {!props.scanning && !props.connected && triedBluetooth && <Text style={styles.connectFail}>Failed</Text>}
            </View>
            {props.scanning &&
                <Text style={styles.infoText}>Crib is only connectable the first 10 minutes after being plugged in. If not connecting, unplug and plug in again.</Text>
            }
            <Back onClick={() => props.setScreen('Home')} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    connectFail: {
        marginTop: 40,
        marginLeft: 15,
        color: 'indianred',
        fontSize: 20
    },
    connectSuccess: {
        marginTop: 43,
        marginLeft: 15,
        color: 'lightgreen',
        fontSize: 17
    },
    container: {
        flex: 1,
    },
    header: {
        marginTop: 50,
        fontSize: 25,
        marginLeft: 30,
        color: Colors.purpleLight,
    },
    headerBar: {
        marginLeft: 30,
        height: 2,
        width: Dimensions.get('window').width - 60,
        backgroundColor: Colors.purpleLight,
        marginTop: 10
    },
    list: {
        marginLeft: 30,
        marginTop: 30,
    },
    listText: {
        fontSize: 30,
        color: Colors.purpleLight,
    },
    infoText: {
        marginLeft: 30,
        width: Dimensions.get('window').width - 60,
        marginTop: 5,
        color: Colors.purpleLight
    }
})

export default Settings;