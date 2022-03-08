import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../global/styles/colors';
import Fonts from '../../global/styles/fonts';

const SpeakerControl = () => {
    const [volume, setVolume] = useState(17);
    const CIRCLES_ON_SCREEN = 18;

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