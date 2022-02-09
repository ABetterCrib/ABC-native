import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Size from '../../global/constants/size';
import Colors from '../../global/styles/colors';

const SliderDisplay = (props) => {
    const [textWidth, setTextWidth] = useState(0);

    const color = {
        backgroundColor: Colors[props.color]
    };
    const colorText = {
        color: Colors[props.color]
    };
    // These three points always show on the line
    const points = {
        low: {
            // Bpm is the value of where they are on the line
            bpm: props.bpm >= props.bpmRange.low ? props.bpmRange.low : props.bpm,
            // Measured is a boolean for whether it is a measured value or boundry value
            measured: props.bpm >= props.bpmRange.low ? false : true,
        },
        mid: {
            bpm: [props.bpm, props.bpmRange.low, props.bpmRange.high].sort((f, s) => f > s)[1],
            measured: [props.bpm, props.bpmRange.low, props.bpmRange.high].sort()[1] === props.bpm ? true : false,
        },
        high: {
            bpm: props.bpm <= props.bpmRange.high ? props.bpmRange.high : props.bpm,
            measured: props.bpm <= props.bpmRange.high ? false : true,
        },
    }
    // The style that places the middle circle in the right spot
    const circleMid = {
        marginLeft: (points.mid.bpm - points.low.bpm) / (points.high.bpm - points.low.bpm) * Size.barLength + 20,
    }
    const textLeft = {
        marginLeft: points.low.measured ? circleMid.marginLeft - 20 : 0,
    }
    const textRight = {
        marginLeft: points.high.measured ? circleMid.marginLeft - 20: Size.barLength - 5,
    }

    return (
        <View style={styles.container}>
            {/* Bar that spans the screen */}
            <View style={[styles.bar, color]}/>
            {/* The three dots on the bar */}
            <View style={[styles.circle, styles.circleLeft, color]} />
            <View style={[styles.circle, styles.circleRight, color]} />
            <View style={[styles.circle, circleMid, color]} />
            {/* The text under the bar*/}
            <TouchableOpacity onPress={props.changeBpm} style={[styles.textButton, textLeft]}>
                <Text style={[styles.boundaryText, colorText]}>{props.bpmRange.low} bpm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.changeBpm} style={[styles.textButton, textRight]}>
                <Text style={[styles.boundaryText, colorText]}>{props.bpmRange.high} bpm</Text>
            </TouchableOpacity>
            {/* The text over the bar */}
            <View style={[styles.connectingBar, color, {marginLeft: points.low.measured ? 24 : (points.high.measured ? Size.barLength + 24 : circleMid.marginLeft + 4)}]}/>
            <View
                opacity={textWidth === 0 ? 0 : 1}
                onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
                style={[styles.textbox, color, {marginLeft: points.low.measured ? 24 - textWidth / 2 : (points.high.measured ? Size.barLength - textWidth / 2 + 24 : circleMid.marginLeft - textWidth / 2 + 4)}]}
            >
                <Text style={styles.textboxText}>{props.bpm}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginTop: Size.heartbeatHeight / 1.5 - 4,
        position: 'absolute'
    },
    textButton: {
        position: 'absolute',
        width: 60,
        height: 25,
        marginTop: Size.heartbeatHeight / 1.5 + 10,
    },
    circleLeft: {
        marginLeft: 20,
    },
    circleRight: {
        marginLeft: Size.barLength + 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    bar: {
        width: Size.barLength,
        height: 2,
        marginLeft: 20,
        marginTop: Size.heartbeatHeight / 1.5,
        position: 'absolute'
    },
    connectingBar: {
        height: 30,
        width: 2,
        marginTop: Size.heartbeatHeight / 1.5 - 30,
        position: 'absolute'
    },
    boundaryText: {
        position: 'absolute',
        fontSize: 14,
    },
    textbox: {
        borderRadius: 13,
        height: 42,
        marginTop: Size.heartbeatHeight / 1.5 - 65,
    },
    textboxText: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 30,
    },
})

export default SliderDisplay;