import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import Colors from '../../global/styles/colors';
import Fonts from '../../global/styles/fonts';
import Slider from '@react-native-community/slider';
import user from '../../api/user';

const volumeIcons = {
    muted: require('../../assets/purple-mute-light.png'),
    notMuted: require('../../assets/purple-volume-light.png')
}

const SoundControl = () => {
    const [chosen, setChosen] = useState(user.getSoundtrack());
    const [volume, setVolume] = useState(user.getVolume());
    const [muted, setMuted] = useState(user.getMuted());

    const SOUNDS = [
        [{sound: 'None'}, {sound: 'Birds'}, {sound: 'Stream'}],
        [{sound: 'White'}, {sound: 'City'}, {sound: 'Ocean'}],
        [{sound: 'Music'}, {sound: 'Train'}, {sound: 'Rain'}]
    ]

    const renderSound = ({index, item}, row) => {
        const position = index + row * 3;
        const isChosen = position === chosen;

        return (
            <TouchableOpacity
                style={[styles.button, isChosen && styles.buttonHighlighted]}
                onPress={() => setSound(position)}
            >
                <Text style={styles.soundText}>{item.sound}</Text>
            </TouchableOpacity>
        )
    }

    const setSound = async (trackIndex) => {
        console.log(trackIndex);
        setChosen(trackIndex);
        user.setSoundtrack(trackIndex);
        await user.pushSoundtrackToDatabase(trackIndex);
    }

    const SoundsRow = ({row}) => (
        <FlatList
            data={SOUNDS[row]}
            renderItem={(item) => renderSound(item, row)}
            keyExtractor={(item) => item.sound}
            horizontal={true}
        />
    )

    const storeVolume = async (vol) => {
        user.setVolume(vol);
        await user.pushVolumeToDatabase(vol);
    }

    return (
        <View style={styles.container}>
            <Text style={[Fonts.purpleHeader, {marginBottom: 15}]}>Select Soundtrack</Text>
            <SoundsRow row={0} />
            <SoundsRow row={1} />
            <SoundsRow row={2} />
            <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
                <TouchableOpacity style={styles.image} onPress={() => {setMuted(!muted); user.setMuted(!muted)}}>
                    <Image source={volumeIcons[muted ? 'muted' : 'notMuted']} style={[styles.image, muted && {opacity: 0.7}]}/>
                </TouchableOpacity>
                <Slider
                    disabled={muted}
                    value={volume}
                    onValueChange={(vol) => setVolume(vol)}
                    onSlidingComplete={(vol) => storeVolume(vol)}
                    style={{width: 260, marginLeft: 10}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={Colors.purpleMid}
                    thumbTintColor={Colors.purpleMid}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 40,
        marginHorizontal: Dimensions.get('window').width * 0.1 - 27,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonHighlighted: {
        backgroundColor: Colors.purpleLight
    },
    container: {
        height: 220,
        width: '100%',
        position: 'absolute',
        bottom: 110,
        alignItems: 'center',
    },
    image: {
        width: 25,
        height: 25
    },
    soundText: {
        color: Colors.purpleDark,
        fontSize: 20
    }
})

export default SoundControl;