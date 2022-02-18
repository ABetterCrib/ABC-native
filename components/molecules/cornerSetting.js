import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../global/styles/colors';

const CornerSettings = (props) => {
    return (
        <>
            <View style={styles.corner} />
            <TouchableOpacity style={styles.iconButton}>
                <Image source={require('../../assets/settings.png')} style={styles.icon}/>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    corner: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: Colors.purple,
        position: 'absolute',
        right: -38,
        bottom: -38,
        opacity: 0.4
    },
    iconButton: {
        height: 58,
        width: 58,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    icon: {
        height: 40,
        width: 40,
        position: 'absolute',
        bottom: 6,
        right: 6,
    }
});

export default CornerSettings;