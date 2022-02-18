import React from 'react';
import { View, StyleSheet } from 'react-native';
import Size from '../../global/constants/size';

const Video = (props) => {
    return (
        <View style={styles.box} />
    )
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: Size.videoHeight,
        backgroundColor: 'gray',
        alignSelf: 'center',
    }
});

export default Video;