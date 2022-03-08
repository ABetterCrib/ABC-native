import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
import user from '../api/user';
import Colors from '../global/styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const Welcome = (props) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failedLogin, setFailedLogin] = useState(false);

    const login = async () => {
        setLoading(true);
        const validLogin = await user.userExists(username, password);
        if (validLogin) {
            await user.fill(username);
            props.setScreen('Home');
        } else {
            setFailedLogin(true);
            setPassword('');
        }
        setLoading(false);
    };

    return (
        <LinearGradient colors={['#8070E5', '#034371']} style={styles.container}>
            <Image source={require('../assets/purple-abc.png')} style={styles.logo}/>
            {failedLogin ? <Text style={styles.errorMessage}>Invalid login credentials</Text> : null}
            <TextInput
                style={styles.input}
                placeholder={'username'}
                selectionColor={'rgba(0, 0, 0, 0.6)'}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={'password'}
                selectionColor={'rgba(0, 0, 0, 0.6)'}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity onPress={() => login()}>
                <LinearGradient style={styles.button} colors={['#9DC6F7', '#709DC6']}>
                    <Text style={styles.text}>{loading ? 'Loading...' : 'Login'}</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createAccountButton}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    button: {
        width: Dimensions.get('window').width * 0.8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 30,
        color: 'black'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: Colors.purpleLight
    },
    createAccountButton: {
        width: 150,
        marginTop: 20,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createAccountText: {
        fontSize: 20,
        color: Colors.white,
        textDecorationLine: 'underline'
    },
    errorMessage: {
        marginBottom: -10,
        fontSize: 15,
        color: '#FF7777'
    },
    input: {
        width: Dimensions.get('window').width * 0.8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: Colors.white,
        fontSize: 23,
        paddingLeft: 10,
    },
    logo: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.5,
        marginTop: -90,
        marginBottom: 40
    },
    text: {
        color: Colors.black,
        fontSize: 28
    }
});

export default Welcome