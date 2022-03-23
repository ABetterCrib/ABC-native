import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../global/styles/colors';
import Fonts from '../../global/styles/fonts';
import user from '../../api/user';
import Rocker from '../../api/rocker';

const RockerControl = () => {
    const [percent, setPercent] = useState(user.getRocker());

    return (
        <View style={styles.container}>
            <Text style={[styles.rockerText, Fonts.purpleHeader]}>Rocker setting</Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.button, percent === 0 && styles.buttonHighlighted]} onPress={() => {setPercent(0); user.setRocker(0); Rocker.setState(0);}}>
                    <Text style={[styles.buttonText]}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, percent === 0.5 && styles.buttonHighlighted]} onPress={() => {setPercent(0.5); user.setRocker(0.5)}}>
                    <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, percent === 1 && styles.buttonHighlighted]} onPress={() => {setPercent(1); user.setRocker(1)}}>
                    <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 140,
    },
    button: {
        marginHorizontal: 20,
        width: 60,
        height: 60,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttonHighlighted: {
        backgroundColor: Colors.purpleLight
    },
    rockerText: {
        marginBottom: 40,
    },
    buttonText: {
        fontSize: 25,
        color: Colors.purpleDark,
    }
});

export default RockerControl;