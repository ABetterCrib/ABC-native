import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Back from '../components/atoms/back';
import Colors from '../global/styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = (props) => {

    const logout = async () => {
        await AsyncStorage.removeItem('LOGIN');
        props.setScreen('Welcome');
    }

    return (
        <LinearGradient style={styles.container} colors={['#5477D4', '#2B2385']}>
            <TouchableOpacity style={styles.list} onPress={() => logout()}>
                <Text style={styles.listText}>Logout</Text>
            </TouchableOpacity>
            <Back onClick={() => props.setScreen('Home')} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purple
    },
    list: {
        color: Colors.purpleLight,
        marginLeft: 30,
        marginTop: 30,
        width: Dimensions.get('window').width - 60
    },
    listText: {
        fontSize: 30,
    }
})

export default Settings;