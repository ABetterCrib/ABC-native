import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import Size from '../../global/constants/size';

const SettingsButton = (props) => {
    if (props.style === null) props.style = {};

    return(
        <TouchableOpacity onPress = {() => alert('Pressed Settings')}>
            <Image source={require('../../assets/settings.png')} style={[styles.settings, props.style]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    settings: {
        height: Size.headerHeight * 0.55,
        width: Size.headerHeight * 0.55,
    }
});

export default SettingsButton;