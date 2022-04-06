import React from 'react'
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import BASE_IP from '../../api/ip';

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
            source={{uri: BASE_IP.concat(':8000/stream.mjpg')}}
        />
    )
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
    }
});

export default LiveVideo;