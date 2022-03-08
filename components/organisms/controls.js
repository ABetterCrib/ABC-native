import React, { useState } from 'react';
import RockerControl from '../molecules/rockerControl';
import MainControl from '../molecules/mainControl';
import SpeakerControl from '../molecules/speakerControl';
import SoundControl from '../molecules/soundControl';
import Back from '../atoms/back';

const Controls = () => {
    const CONTROL_MAIN = 0;
    const CONTROL_SOUND = 1;
    const CONTROL_SPEAK = 2;
    const CONTROL_ROCK = 3;

    const [controlScreen, setControlScreen] = useState(CONTROL_MAIN);

    const getControlScreen = () => {
        if (controlScreen === CONTROL_MAIN) {
            return (
                <MainControl
                    setSpeak={() => setControlScreen(CONTROL_SPEAK)}
                    setRock={() => setControlScreen(CONTROL_ROCK)}
                    setSound={() => setControlScreen(CONTROL_SOUND)}
                />
            )
        } else if (controlScreen === CONTROL_SOUND) {
            return (
                <>
                    <SoundControl />
                    <Back onClick={() => setControlScreen(CONTROL_MAIN)}/>
                </>
            )
        } else if (controlScreen === CONTROL_SPEAK) {
            return (
                <>
                    <SpeakerControl />
                    <Back onClick={() => setControlScreen(CONTROL_MAIN)}/>
                </>
            )
        } else if (controlScreen === CONTROL_ROCK) {
            return (
                <>
                    <RockerControl />
                    <Back onClick={() => setControlScreen(CONTROL_MAIN)}/>
                </>
            )
        }
    }

    return(
        <>
            {getControlScreen()}
        </>
    )
}

export default Controls;