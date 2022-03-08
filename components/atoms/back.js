import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../global/styles/colors';

const Back = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onClick}>
            <Image source={require('../../assets/purple-arrow-light.png')} style={styles.image}/>
            <Text style={styles.text}>back</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 70,
        position: 'absolute',
        bottom: 10,
        left: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        height: 15,
        width: 15,
        marginRight: 5,
        marginTop: 3,
        transform: [
            { scaleX: -1 }
        ],
    },
    text: {
        color: Colors.purpleLight,
        fontSize: 20
    }
})

export default Back;