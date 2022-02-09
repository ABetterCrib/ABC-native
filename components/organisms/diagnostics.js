import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../global/styles/colors';
import Size from '../../global/constants/size';
import SmallHeader from '../../templates/smallHeader';
import Video from '../molecules/video';
import Heartbeat from '../molecules/heartbeat';
import ChangeBpm from '../molecules/changeBpm';

const Diagnostics = (props) => {
    const [changeBpm, setChangeBpm] = useState(false);
    const [bpm, setBpm] = useState(110);
    const [bpmRange, setBpmRange] = useState({
        low: 90,
        high: 170,
    });

    return(
        <View style={styles.diagnostics}>
            <SmallHeader text={'Diagnostics'} />
            <Video />
            {changeBpm
            ?
            <ChangeBpm
                color={bpm <= bpmRange.high && bpm >= bpmRange.low ? 'purple' : 'red'}
                goBack={() => setChangeBpm(false)}
                bpmRange={bpmRange}
                setBpmRange={setBpmRange}
            />
            :
            <Heartbeat
                color={bpm <= bpmRange.high && bpm >= bpmRange.low ? 'purple' : 'red'}
                bpm={bpm}
                bpmRange={bpmRange}
                changeBpm={() => setChangeBpm(true)}
                bpmChanged={changeBpm}
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    diagnostics: {
        backgroundColor: Colors.white,
        height: Size.diagnosticsHeight,
    }
});

export default Diagnostics;