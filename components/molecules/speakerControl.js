import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Colors from '../../global/styles/colors';
import Fonts from '../../global/styles/fonts';
import Api from '../../api';
import { PermissionsAndroid, Platform } from "react-native";
import { LogBox } from 'react-native';
import RecordPlayer from '../../api/recorder';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const SpeakerControl = () => {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const getPermissions = async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                ]);
            }
        }
        getPermissions();
    });

    const startSlide = () => {
        const intervalId = setInterval(() => {setTimeElapsed(timeElapsed => (timeElapsed + 17 > 5000 ? 5000 : timeElapsed + 17) )}, 100);
        setTimeout(() => {
            clearInterval(intervalId);
            setTimeElapsed(0);
        }, 5000);
    }

    const darkBarWidth = {
        width: Dimensions.get('window').width * 0.45 * ((timeElapsed === -1 ? 0 : timeElapsed) / 5000),
    };

    return (
        <View style={styles.container}>
            <Text style={Fonts.purpleHeader}>{timeElapsed === 0 ? 'Press to record' : 'Recording...'}</Text>
            <View style={{flexDirection: 'row', marginTop: 50}}>
                { timeElapsed === 0 && <TouchableOpacity style={styles.recordSize} onPress={() => {RecordPlayer.startRecorder(), startSlide()}} pressRetentionOffset={100}>
                    <Image source={require('../../assets/purple-record-light.png')} style={[styles.recordSize]}/>
                </TouchableOpacity>}
                { timeElapsed !== 0 && <View style={styles.barLight}/>}
                { timeElapsed !== 0 && <View style={[styles.barDark, darkBarWidth]}/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    barLight: {
        height: 3,
        marginTop: 31,
        width: Dimensions.get('window').width * 0.45,
        backgroundColor: Colors.purpleLight,
    },
    barDark: {
        backgroundColor: Colors.purpleMid,
        position: 'absolute',
        height: 3,
        marginTop: 31,
    },
    container: {
        height: 110,
        width: '100%',
        position: 'absolute',
        bottom: 140,
        alignItems: 'center',
    },
    circle: {
        height: 8,
        width: 8,
        borderRadius: 5,
        backgroundColor: 'white',
        marginHorizontal: 5,
    },
    circleContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    },
    circleFilled: [
        {backgroundColor: Colors.purple},
        {backgroundColor: Colors.purple},
        {backgroundColor: Colors.purple},
        {backgroundColor: Colors.purple},
        {backgroundColor: Colors.purple},
        {backgroundColor: Colors.purpleMid},
        {backgroundColor: Colors.purpleMid},
        {backgroundColor: Colors.purpleMid},
        {backgroundColor: Colors.purpleMid},
        {backgroundColor: Colors.purpleMid},
        {backgroundColor: Colors.purpleMid},
        {backgroundColor: Colors.purpleMid},
        {backgroundColor: Colors.redMid},
        {backgroundColor: Colors.redMid},
        {backgroundColor: Colors.redMid},
        {backgroundColor: Colors.redMid},
        {backgroundColor: Colors.red},
        {backgroundColor: Colors.red},
    ],
    recordSize: {
        width: 70,
        height: 70
    }
});

export default SpeakerControl;