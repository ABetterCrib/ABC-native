import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Colors from '../../global/styles/colors';
import user from '../../api/user';

const arrowImages = {
    purpleLight: require('../../assets/purple-arrow-light.png'),
    redLight: require('../../assets/red-arrow-light.png')
}

const barLength = Dimensions.get('window').width - 150;

const BpmSlider = (props) => {
    const [textWidth, setTextWidth] = useState(0);
    const [changeLeftBpm, setChangeLeftBpm] = useState(false);
    const [changeRightBpm, setChangeRightBpm] = useState(false);
    const [bpmLow, setBpmLow] = useState(user.getBpmLow());
    const [bpmHigh, setBpmHigh] = useState(user.getBpmHigh());
    const { bpm } = props;

    const isAlert =  bpm > user.getBpmHigh() || bpm < user.getBpmLow();
    const localColor = isAlert ? 'redLight' : 'purpleLight';

    const calculatePoints = (low, high, real) => {
        return {
            low: {
                // Bpm is the value of where they are on the line
                bpm: real >= low ? low : real,
                // Measured is a boolean for whether it is a measured value or boundry value
                measured: real >= low ? false : true,
            },
            mid: {
                bpm: [real, low, high].sort((f, s) => f > s)[1],
                measured: [real, low, high].sort((f, s) => f > s)[1] === real ? true : false,
            },
            high: {
                bpm: real <= high ? high : real,
                measured: real <= high ? false : true,
            },
        };
    }

    const [points, setPoints] = useState(calculatePoints(bpmLow, bpmHigh, bpm));

    const handleLowBpmChange = async (e) => {
        setChangeLeftBpm(false);
        if (e.nativeEvent.text === '') return;
        const value = Number(e.nativeEvent.text.replace(/\D/g,''));
        if (value > 0 && value < bpmHigh) {
            setBpmLow(value);
            user.setBpmLow(value);
            setPoints(calculatePoints(value, bpmHigh, bpm));
            props.setAlert(bpm > user.getBpmHigh() || bpm < value);
            await user.pushBpmToDatabase();
        } else {
            alert('Minimum BPM must be smaller than the maximum and greater than zero');
        }
    }

    const handleHighBpmChange = async (e) => {
        setChangeRightBpm(false);
        if (e.nativeEvent.text === '') return;
        const value = Number(e.nativeEvent.text.replace(/\D/g,''));
        if (value > bpmLow) {
            setBpmHigh(value);
            user.setBpmHigh(value);
            setPoints(calculatePoints(bpmLow, value, bpm));
            props.setAlert(bpm > value || bpm < user.getBpmLow());
            await user.pushBpmToDatabase();
        } else {
            alert('Maximum BPM must be larger than the minimum');
        }
    }

    const getLeftBpm = () => {
        if (changeLeftBpm) {
            return (
                <View style={[styles.textButton, textLeft, {flexDirection: 'row', marginTop: 77}]}>
                    <TextInput
                        style={styles.bpmInput}
                        placeholder={'90'}
                        placeholderTextColor={Colors.purple}
                        keyboardType='numeric'
                        maxLength={3}
                        onSubmitEditing={handleLowBpmChange}
                    />
                    <Text style={[{fontSize: 14, marginLeft: 5, marginTop: 3, color: Colors[localColor]}]}>bpm</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {if (!changeRightBpm) setChangeLeftBpm(true)}} style={[styles.textButton, textLeft, {marginTop: 81}]}>
                    <Text style={[styles.boundaryText, {color: Colors[localColor]}]}>{bpmLow} bpm</Text>
                </TouchableOpacity>
            )
        }
    }

    const getRightBpm = () => {
        if (changeRightBpm) {
            return (
                <View style={[styles.textButton, textRight, {flexDirection: 'row', marginTop: 77}]}>
                    <TextInput
                        style={styles.bpmInput}
                        placeholder={'170'}
                        placeholderTextColor={Colors.purple}
                        keyboardType='numeric'
                        maxLength={3}
                        onSubmitEditing={handleHighBpmChange}
                    />
                    <Text style={[{fontSize: 14, marginLeft: 5, marginTop: 3, color: Colors[localColor]}]}>bpm</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {if (!changeLeftBpm) setChangeRightBpm(true)}} style={[styles.textButton, textRight, {marginTop: 81}]}>
                    <Text style={[styles.boundaryText, {color: Colors[localColor]}]}>{bpmHigh} bpm</Text>
                </TouchableOpacity>
            )
        }
    }

    // Styles that depend on props
    const propStyles = {
        color: {
            backgroundColor: Colors[localColor]
        },
    };

    // The style that places the middle circle in the right spot
    const circleMid = {
        marginLeft: (points.mid.bpm - points.low.bpm) / (points.high.bpm - points.low.bpm) * barLength + 35,
    }

    // Style that places the left bpm label in the right spot
    const textLeft = {
        marginLeft: points.low.measured ? circleMid.marginLeft - 25 : 13,
    }
    // Style that places the right bpm label in the right spot
    const textRight = {
        marginLeft: points.high.measured ? circleMid.marginLeft - 25: barLength + 6,
    }
    if (textRight.marginLeft < textLeft.marginLeft + (changeLeftBpm ? 90 : 60)) textRight.marginLeft = textLeft.marginLeft + (changeLeftBpm ? 90 : 60);

    return (
        <View style={{flexDirection: 'row', marginTop: 30}}>
            {/* Arrow image */}
            <TouchableOpacity style={styles.arrowButton} onPress={props.back}>
                <Image source={arrowImages[localColor]} style={styles.arrow}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                {/* Bar and dots along bar */}
                <View style={[styles.bar, propStyles.color]}/>
                <View style={[styles.circle, styles.circleLeft, propStyles.color]} />
                <View style={[styles.circle, styles.circleRight, propStyles.color]} />
                <View style={[styles.circle, circleMid, propStyles.color]} />
                {/* Two bpm labels underneath the bar */}
                {getLeftBpm()}
                {getRightBpm()}
                {/* The bpm that corresponds to the baby */}
                <View style={[styles.connectingBar, propStyles.color, {marginLeft: points.low.measured ? 39 : (points.high.measured ? barLength + 39 : circleMid.marginLeft + 4)}]}/>
                <View
                    opacity={textWidth === 0 ? 0 : 1}
                    onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
                    style={[styles.textbox, propStyles.color, {marginLeft: points.low.measured ? 39 - textWidth / 2 : (points.high.measured ? barLength - textWidth / 2 + 39 : circleMid.marginLeft - textWidth / 2 + 4)}]}
                >
                    <Text style={styles.textboxText}>{bpm}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    arrow: {
        height: 40,
        width: 20,
        transform: [
            { scaleX: -1 }
        ],
    },
    arrowButton: {
        height: 60,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20,
    },
    bar: {
        height: 2,
        marginLeft: 40,
        marginTop: 60,
        width: barLength,
        position: 'absolute'
    },
    boundaryText: {
        position: 'absolute',
        fontSize: 14,
    },
    bpmInput: {
        backgroundColor: 'white',
        padding: 0,
        paddingLeft: 5,
        width: 40,
        borderRadius: 3,
        height: 26,
        fontSize: 17
    },
    circle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginTop: 56,
        position: 'absolute'
    },
    circleLeft: {
        marginLeft: 35,
    },
    circleRight: {
        marginLeft: barLength + 35,
    },
    connectingBar: {
        height: 30,
        width: 2,
        marginTop: 30,
        position: 'absolute'
    },
    textbox: {
        borderRadius: 13,
        height: 42,
    },
    textboxText: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 30,
        color: Colors.black
    },
    textButton: {
        position: 'absolute',
        width: 60,
        height: 25,
    },
})

export default BpmSlider;