import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Size from '../../global/constants/size';

const Video = (props) => {
    return (
        <View style={styles.box} />
    )
}

const styles = StyleSheet.create({
    box: {
        width: Dimensions.get('window').width * 0.9,
        height: Size.videoHeight,
        backgroundColor: 'gray',
        alignSelf: 'center',
        marginTop: 10,
    }
});

export default Video;