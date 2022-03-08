import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Colors from '../../global/styles/colors';
import user from '../../api/user';

const heartbeatImages = {
    purpleLight: require('../../assets/purple-heart-light.png'),
    redLight: require('../../assets/red-heart-light.png')
}
const arrowImages = {
    purpleLight: require('../../assets/purple-arrow-light.png'),
    redLight: require('../../assets/red-arrow-light.png')
}

const BpmAnalog = (props) => {
    const color = props.bpm > user.getBpmHigh() || props.bpm < user.getBpmLow() ? 'redLight' : 'purpleLight';

    return (
        <View style={styles.background}>
            <Image source={heartbeatImages[color]} style={styles.heart} />
            <Text style={[styles.bpm, {color: Colors[color]}]}>{props.bpm} bpm</Text>
            <TouchableOpacity style={styles.arrowButton} onPress={props.expand}>
                <Image source={arrowImages[color]} style={styles.arrow}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    arrow: {
        width: 20,
        height: 40,
    },
    arrowButton: {
        height: 40,
        width: 40,
        marginTop: 25,
        paddingLeft: 8,
    },
    background: {
        height: 200,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    heart: {
        marginTop: 10,
        width: 60 * 1.2,
        height: 60,
    },
    bpm: {
        marginTop: 25,
        marginLeft: 10,
        fontSize: 25,
    }
});

export default BpmAnalog