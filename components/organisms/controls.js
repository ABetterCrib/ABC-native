import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../global/styles/colors';
import Size from '../../global/constants/size';
import SmallHeader from '../../templates/smallHeader';
import RockerControl from '../molecules/rockerControl';

const Controls = (props) => {


    return(
        <View style={styles.controls}>
            <SmallHeader text={'Controls'} />
            <RockerControl />
        </View>
    )
}

const styles = StyleSheet.create({
    controls: {
        height: Size.controlsHeight,
        backgroundColor: Colors.white
    },
});

export default Controls;