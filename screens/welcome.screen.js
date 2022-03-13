import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, ActivityIndicator, View } from 'react-native';
import user from '../api/user';
import Colors from '../global/styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = (props) => {
    const [gettingData, setGettingData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failedLogin, setFailedLogin] = useState(false);

    const login = async (name, passwd, onBoot) => {
        setLoading(true);
        const validLogin = await user.userExists(name, passwd);
        if (validLogin) {
            await user.fill(name, passwd);
            setLoading(false);
            await AsyncStorage.setItem('LOGIN', JSON.stringify({password: passwd, username: name}));
            props.setScreen('Home');
        } else if (!onBoot) {
            setFailedLogin(true);
            setPassword('');
            setLoading(false);
        } else {
            setGettingData(false);
        }
    };

    useEffect(() => {
        const loginIfAlreadyLoggedIn = async () => {
            const storage = await AsyncStorage.getItem('LOGIN');
            if (storage !== null) {
                const credentials = await JSON.parse(storage);
                setPassword(credentials.password);
                setUsername(credentials.username);
                await login(credentials.username, credentials.password, true);
            } else {
                setGettingData(false);
            }
        }

        loginIfAlreadyLoggedIn();
    }, [])

    if (gettingData) return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>
    );

    return (
        <LinearGradient colors={['#8070E5', '#034371']} style={styles.container}>
            <Image source={require('../assets/purple-abc.png')} style={styles.logo}/>
            {failedLogin ? <Text style={styles.errorMessage}>Invalid login credentials</Text> : null}
            <TextInput
                style={styles.input}
                placeholder={'username'}
                placeholderTextColor={Colors.gray}
                selectionColor={'rgba(0, 0, 0, 0.6)'}
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder={'password'}
                placeholderTextColor={Colors.gray}
                selectionColor={'rgba(0, 0, 0, 0.6)'}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity onPress={() => login(username, password, false)}>
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
        color: Colors.black
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