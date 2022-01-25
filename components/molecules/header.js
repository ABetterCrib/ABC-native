import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../global/styles/colors';
import SettingsButton from '../atoms/settingsButton';

const Header = (props) => {
    return(
        <View style={styles.navbar}>
            <Text style={styles.title}>Your crib</Text>
            <SettingsButton style={styles.settings}/>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 68,
        backgroundColor: Colors.purple,
    },
    title: {
        fontSize: 34,
        color: Colors.black,
        marginLeft: 20,
    },
    settings: {
        marginRight: 15,
    }
});

export default Header;