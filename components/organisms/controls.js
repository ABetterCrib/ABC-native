import React from 'react';
import { View, StyleSheet, } from 'react-native';
import SoundControl from '../../components/molecules/soundControl';
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
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 50,
   },
});

export default Controls;