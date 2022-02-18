import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Easing, Animated, TouchableOpacity, Image, Text } from 'react-native';
import Size from '../../global/constants/size';
import Colors from '../../global/styles/colors';
import SliderDisplay from '../molecules/sliderDisplay';

const heartbeatImages = {
    purple: require('../../assets/purple-heart.png'),
    red: require('../../assets/red-heart.png')
}
const arrowImages = {
    purple: require('../../assets/purple-arrow.png'),
    red: require('../../assets/red-arrow.png')
}

const Heartbeat = (props) => {
    let opacity = new Animated.Value(0);

    const animate = easing => {
        opacity.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
          easing
        }).start();
    };

    const sizeW = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Size.heartWidth]
    });

    const sizeH = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Size.heartWidth * 0.83]
    });

    const animatedStyles = [
        styles.heart,
        {
          opacity,
          width: sizeW,
          height: sizeH,
        }
    ];

    useEffect(() => {
        animate(Easing.bounce);
    }, [])

    return (
        <View style={styles.background}>
            <Image source={heartbeatImages[props.color]} style={styles.heart} />
            <Text style={styles.bpm}>116 bpm</Text>
            <TouchableOpacity style={styles.arrowButton}>
                <Image source={arrowImages[props.color]} style={styles.arrow}/>
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
        color: Colors.black
    }
});

export default Heartbeat;