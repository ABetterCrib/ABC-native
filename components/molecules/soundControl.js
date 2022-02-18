import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../global/styles/colors';

const SoundControl = (props) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Spotify</Text>
                <Image source={require('../../assets/purple-spotify-light.png')} style={styles.buttonIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Speaker</Text>
                <Image source={require('../../assets/purple-microphone-light.png')} style={styles.buttonIcon}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        height: 60,
        backgroundColor: Colors.purple,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 25,
        color: Colors.black,
        marginHorizontal: 10,
    },
    buttonIcon: {
        height: 30,
        width: 30,
        marginRight: 8,
    }
});

export default SoundControl;