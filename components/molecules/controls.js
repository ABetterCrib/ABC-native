import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import Colors from '../../global/styles/colors';
import Size from '../../global/constants/size'

const smallHeaderWidth = 90;

const Controls = (props) => {
    return(
        <View style={styles.controls}>
            <View style={styles.smallHeader}>
                <Text style={styles.backgroundFont}>Controls</Text>
                <View style={styles.dividerBar} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    controls: {
        height: Size.controlsHeight,
        backgroundColor: Colors.white
    },
    smallHeader: {
        flexDirection: 'row',
        marginTop: 10
    },
    dividerBar: {
        marginTop: 13,
        height: 2.5,
        width: Dimensions.get('window').width - smallHeaderWidth - 30,
        backgroundColor: Colors.textBackground,
    },
    backgroundFont: {
        fontSize: 20,
        color: Colors.textBackground,
        marginLeft: 10,
        width: smallHeaderWidth,
    }
});

export default Controls;