import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../global/styles/colors';
import Fonts from '../../global/styles/fonts';
import Rocker from '../../api/rocker';
import user from '../../api/user';

const RockerControl = () => {
    const [rock, setRock] = useState(user.getRocker());

    return (
        <View style={styles.container}>
            <Text style={[styles.rockerText, Fonts.purpleHeader]}>Rocker setting</Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.button, rock === 0 && styles.buttonHighlighted]} onPress={() => {setRock(0); Rocker.setRocker(0)}}>
                    <Text style={[styles.buttonText]}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, rock === 1 && styles.buttonHighlighted]} onPress={() => {setRock(1); Rocker.setRocker(1)}}>
                    <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, rock === 2 && styles.buttonHighlighted]} onPress={() => {setRock(2); Rocker.setRocker(2)}}>
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