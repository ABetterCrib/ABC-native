import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../global/styles/colors';
import Fonts from '../../global/styles/fonts';
import { PermissionsAndroid } from "react-native";
import Recording from "react-native-recording";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const SpeakerControl = () => {
    const [volume, setVolume] = useState(17);
    const CIRCLES_ON_SCREEN = 18;
    let listener

    useEffect(() => {
        const startRecording = async () => {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);

            Recording.init({
                bufferSize: 4096,
                sampleRate: 44100,
                bitsPerChannel: 16,
                channelsPerFrame: 1,
            });

            listener = Recording.addRecordingEventListener((data) =>
                console.log(data)
            );

            Recording.start();
        }

        startRecording();

        return (async () => {
            // stop recording
            Recording.stop();
            listener.remove();
        });
    })

    return (
        <View style={styles.container}>
            <Text style={Fonts.purpleHeader}>Speak</Text>
            <View style={styles.circleContainer}>
                {Array.from('1'.repeat(volume).concat('0'.repeat(CIRCLES_ON_SCREEN-volume)))
                .map((el, index) => {
                    return (
                        <View style={[styles.circle, el === '1' && styles.circleFilled[index]]} key={index}/>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    ]
});

export default SpeakerControl;