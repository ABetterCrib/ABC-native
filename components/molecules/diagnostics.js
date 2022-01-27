import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../global/styles/colors';
import Size from '../../global/constants/size';

const smallHeaderWidth = 120;

const Diagnostics = (props) => {
    return(
        <View style={styles.diagnostics}>
            <View style={styles.smallHeader}>
                <Text style={styles.backgroundFont}>Diagnostics</Text>
                <View style={styles.dividerBar} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    diagnostics: {
        backgroundColor: Colors.white,
        height: Size.diagnosticsHeight,
    },
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

export default Diagnostics;