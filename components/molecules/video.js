//import React from 'react';
import React from 'react'
import { View, StyleSheet } from 'react-native';
import Size from '../../global/constants/size';
import { WebView } from 'react-native-webview';

const LiveVideo = (props) => {

    return(
        <WebView 
        style={styles.box}
        automaticallyAdjustContentInsets={true}
        scalesPageToFit={true}
        startInLoadingState={false}
        contentInset={{top: 0, right: 0, left: 0, bottom: 0}}
        scrollEnabled={false}
        //source={{html: this.formatHtml(), baseUrl: '/'}} 
        source={{uri: 'http://153.106.229.191:8000/stream.mjpg'}}
        />
    )
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: Size.videoHeight,
        //backgroundColor: 'gray',
        alignSelf: 'center',
    }
});

//export default Livevideo;