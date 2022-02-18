import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../global/styles/colors';

const RockerControl = (props) => {
    const [percent, setPercent] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.rockerText}>Rocker</Text>
            <TouchableOpacity style={[styles.button, percent === 0 && styles.buttonHighlighted]} onPress={() => setPercent(0)}>
                <Text style={[styles.buttonText]}>0%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, percent === 50 && styles.buttonHighlighted]} onPress={() => setPercent(50)}>
                <Text style={styles.buttonText}>50%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, percent === 100 && styles.buttonHighlighted]} onPress={() => setPercent(100)}>
                <Text style={styles.buttonText}>100%</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        marginLeft: 10,
        width: 60,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
    },
    buttonHighlighted: {
        backgroundColor: Colors.purple
    },
    rockerText: {
        fontSize: 24,
        color: Colors.black,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 20,
        color: Colors.black,
    }
});

export default RockerControl;