import React, { useState } from 'react';
import BpmAnalog from '../molecules/bpmAnalog';
import BpmSlider from '../molecules/bpmSlider';

const Heartbeat = (props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            {expanded ?
            <BpmSlider bpm={props.bpm} back={() => setExpanded(false)} setAlert={props.setAlert}/> :
            <BpmAnalog bpm={props.bpm} expand={() => setExpanded(true)}/>
            }
        </>
    )
}

export default Heartbeat;