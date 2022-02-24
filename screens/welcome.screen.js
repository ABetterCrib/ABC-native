import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import user from '../api/user';
import Colors from '../global/styles/colors';

const Welcome = (props) => {
    const [loading, setLoading] = useState(false);

    const start = async () => {
        setLoading(true);
        await user.fill();
        setLoading(false);
        props.setScreen('Home');
    };

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <Text style={styles.title}>ABC</Text>
            <TouchableOpacity style={styles.button} onPress={() => start()}>
                <Text>{loading ? 'Loading...' : 'Start'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        color:  'blue',
        fontFamily: 'sans-serif-medium',
        marginTop: -40,
    },
    button: {
        marginTop: 50,
        width: 100,
        height: 50,
        backgroundColor: Colors.purple,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 30,
        color: 'black'
    }
});

export default Welcome