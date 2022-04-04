/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import Controls from '../components/organisms/controls';
import Video from '../components/molecules/video';
import Heartbeat from '../components/organisms/heartbeat';
import Size from '../global/constants/size';
import user from '../api/user';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CornerSettings from '../components/atoms/cornerSetting';
import LiveVideo from '../components/molecules/video';

const Home = (props) => {
   const [bpm, setBpm] = useState(121);
   const [bpmAlert, setBpmAlert] = useState(bpm < user.getBpmLow() || bpm > user.getBpmHigh());

    const colors = bpmAlert
        ? ['#D44646', '#8070E5', '#707CE5']
        : ['#8070E5', '#707CE5'];
    const locations = bpmAlert
        ? [0.3, 0.4, 1]
        : [0, 1];


    return (
        <>
        <LiveVideo />
        <LinearGradient colors={colors} locations={locations} style={styles.background}>
            <Heartbeat bpm={bpm} setAlert={setBpmAlert}/>
            <Controls/>
            <CornerSettings setScreen={props.setScreen}/>
        </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: Dimensions.get('window').height - Size.videoHeight
    },
    buttonText: {
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white'
    },
    colorBlue: {
        backgroundColor: 'blue'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightOff: {
        backgroundColor: 'black',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightOn: {
        backgroundColor: 'blue',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    margin: {
        margin: 10,
    },
});

export default Home;