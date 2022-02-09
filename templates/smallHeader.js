import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../global/styles/colors';

const smallHeaderWidth = 120;

const SmallHeader = (props) => {
    return (
        <View style={styles.smallHeader}>
            <Text style={styles.backgroundFont}>{props.text}</Text>
            <View style={styles.dividerBar} />
        </View>
    )
}

const styles = StyleSheet.create({
    smallHeader: {
        flexDirection: 'row',
        marginTop: 10
    },
    dividerBar: {
        marginTop: 13,
        height: 3,
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

export default SmallHeader;