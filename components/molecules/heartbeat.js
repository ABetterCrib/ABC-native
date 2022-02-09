import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Easing, Animated, TouchableOpacity } from 'react-native';
import Size from '../../global/constants/size';
import Colors from '../../global/styles/colors';
import SliderDisplay from './sliderDisplay';

const heartbeatImages = {
    purple: require('../../assets/purple-heart.png'),
    red: require('../../assets/red-heart.png')
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
        <View style={[styles.background, {backgroundColor: Colors[props.color.concat('Light')]}]}>
            <TouchableOpacity style={styles.heart} onPress={props.changeBpm}>
                <Animated.Image source={heartbeatImages[props.color]} style={animatedStyles}/>
            </TouchableOpacity>
            <SliderDisplay color={props.color} bpm={props.bpm} bpmRange={props.bpmRange} changeBpm={props.changeBpm}/>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        marginTop: 15,
        flex: 1,
        marginBottom: 40,
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
    },
    heart: {
        alignSelf: 'center',
        marginRight: 5,
    },
});

export default Heartbeat;