import React from 'react';
import { View, StyleSheet, } from 'react-native';
import SoundControl from '../../components/molecules/soundControl';
import Size from '../../global/constants/size';
import RockerControl from '../molecules/rockerControl';

const Controls = (props) => {

    return(
        <View style={styles.controls}>
            <SoundControl />
            <RockerControl />
        </View>
    )
}

const styles = StyleSheet.create({
    controls: {
        height: Size.controlsHeight,
    },
});

export default Controls;