import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import Size from '../../global/constants/size';
import Colors from '../../global/styles/colors';

const icon_x = {
    purple: require('../../assets/purple-x.png'),
    red: require('../../assets/red-x.png'),
};

const icon_check = {
    purple: require('../../assets/purple-check.png'),
    red: require('../../assets/red-check.png'),
}

const ChangeBpm = (props) => {
    const [bpmLow, setBpmLow] = useState(String(props.bpmRange.low));
    const [bpmHigh, setBpmHigh] = useState(String(props.bpmRange.high));

    const color = {
        backgroundColor: Colors['purple']
    };

    const handleCheckmark = () => {
        if (Number(bpmLow) >= Number(bpmHigh)) {
            alert('Lowest BPM must be on the left side');
        } else {
            props.setBpmRange({low: Number(bpmLow), high: Number(bpmHigh)});
            props.goBack();
        }
    }

    const handleX = () => {
        props.goBack();
    }

    return (
        <View style={[styles.background, {backgroundColor: Colors['purpleLight']}]}>
            <View style={[styles.bar, color]}/>
            <View style={[styles.circle, styles.circleLeft, color]} />
            <View style={[styles.circle, styles.circleRight, color]} />
            <View style={[styles.input, styles.inputLeft]}>
                <TextInput
                    style={styles.textInput}
                    value={bpmLow}
                    keyboardType='numeric'
                    maxLength={3}
                    onChangeText={(val) => setBpmLow(val)}
                />
                <Text style={styles.textInputBpm}>bpm</Text>
            </View>
            <View style={[styles.input, styles.inputRight]}>
                <TextInput
                    style={styles.textInput}
                    value={bpmHigh}
                    keyboardType='numeric'
                    maxLength={3}
                    onChangeText={(val) => setBpmHigh(val)}
                />
                <Text style={styles.textInputBpm}>bpm</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleCheckmark}>
                    <Image source={icon_check['purple']} style={[styles.imageSize]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleX}>
                    <Image source={icon_x['purple']} style={[styles.imageSize]}/>
                </TouchableOpacity>
            </View>
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
    buttonsContainer: {
        marginLeft: Dimensions.get('window').width * 0.9 - Size.heartbeatHeight / 3 - 15,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    bar: {
        width: Size.barLength,
        height: 2,
        marginLeft: 20,
        marginTop: Size.heartbeatHeight / 1.5,
        position: 'absolute'
    },
    imageSize: {
        height: Size.heartbeatHeight / 3,
        width: Size.heartbeatHeight / 3,
    },
    imageCheck: {
        marginLeft: Dimensions.get('window').width * 0.9 - Size.heartbeatHeight / 3 - 15,
        marginTop: 15,
    },
    textInput: {
        width: 50,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.purple,
        fontSize: 20,
        padding: 0,
        paddingLeft: 5,
        color: Colors.black
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 35,
        marginTop: Size.heartbeatHeight / 1.5 - 50,
    },
    inputLeft: {
        marginLeft: 18,
        position: 'absolute'
    },
    inputRight: {
        marginLeft: Size.barLength - 60,
        position: 'absolute'
    },
    textInputBpm: {
        fontSize: 20,
        marginLeft: 5,
        alignSelf: 'center',
        color: Colors.purple
    },
    circle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginTop: Size.heartbeatHeight / 1.5 - 4,
        position: 'absolute'
    },
    circleLeft: {
        marginLeft: 20,
    },
    circleRight: {
        marginLeft: Size.barLength + 20,
    },
});

export default ChangeBpm;