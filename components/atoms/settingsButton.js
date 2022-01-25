import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../global/styles/colors';

const SettingsButton = (props) => {
    if (props.style === null) props.style = {};

    return(
        <TouchableOpacity onPress = {() => alert('Pressed Settings')}>
            <Text style = {[styles.settings, props.style]}>O</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    settings: {
        color: Colors.black,
        fontSize: 34,
    }
});

export default SettingsButton;