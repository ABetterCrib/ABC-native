import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../../global/styles/colors';

const MainControl = (props) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props.setSound}>
                <Image source={require('../../assets/purple-music.png')} style={styles.image2}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.setSpeak}>
                <Image source={require('../../assets/purple-microphone.png')} style={styles.image}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.setRock}>
                <Image source={require('../../assets/purple-rock.png')} style={styles.image}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 70,
        width: 70,
        backgroundColor: Colors.purpleLight,
        marginHorizontal: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        flexDirection: 'row',
        bottom: 140
    },
    image: {
        height: 50,
        width: 50
    },
    image2: {
        height: 70,
        width: 70
    }
})

export default MainControl;