import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import Colors from '../../global/styles/colors';
import Fonts from '../../global/styles/fonts';
import Slider from '@react-native-community/slider';
import User from '../../api/user';
import Soundtrack from '../../api/soundtrack';

const volumeIcons = {
    muted: require('../../assets/purple-mute-light.png'),
    notMuted: require('../../assets/purple-volume-light.png')
}

const SoundControl = () => {
    const [chosen, setChosen] = useState(User.getSoundtrack());
    const [volume, setVolume] = useState(User.getVolume());
    const [muted, setMuted] = useState(User.getMuted());
    const [songBeingChosen, setSongBeingChosen] = useState(false);

    const SOUNDS = [
        // Zapsplat
        [{sound: 'None'}, {sound: 'Car'}, {sound: 'Stream'}],
        [{sound: 'Pink'}, {sound: 'Heartbeat'}, {sound: 'Ocean'}],
        [{sound: 'Music'}, {sound: 'Train'}, {sound: 'Rain'}]
    ]

    const renderSound = ({item}) => {
        const isChosen = item.sound === chosen;

        return (
            <TouchableOpacity
                style={[styles.button, isChosen && styles.buttonHighlighted]}
                onPress={() => setSound(item.sound)}
                disabled={songBeingChosen}
            >
                <Text style={styles.soundText}>{item.sound}</Text>
            </TouchableOpacity>
        )
    }

    const SoundsRow = ({row}) => (
        <FlatList
            data={SOUNDS[row]}
            renderItem={(item) => renderSound(item)}
            keyExtractor={(item) => item.sound}
            horizontal={true}
        />
    )

    const setSound = async (sound) => {
        setSongBeingChosen(true);
        setTimeout(() => setSongBeingChosen(false), 1000);
        if (sound === chosen) return;
        if (!muted) {
            if (chosen !== 'None') {
                await Soundtrack.stop();
            }
            await Soundtrack.setTrack(sound);
        }
        setChosen(sound);
        User.setSoundtrack(sound);
        await User.pushSoundtrackToDatabase(sound);
    }

    const updateVolume = (vol) => {
        setVolume(vol);
        Soundtrack.setVolume(vol);
    }

    const storeVolume = async (vol) => {
        User.setVolume(vol);
        await User.pushVolumeToDatabase(vol);
    }

    const handleMute = async () => { 
        User.setMuted(!muted);
        if (muted) {
            await Soundtrack.setTrack(chosen);
        } else if (!muted && chosen !== 'None') {
            await Soundtrack.stop();
        }
        setMuted(!muted);
    }

    return (
        <View style={styles.container}>
            <Text style={[Fonts.purpleHeader, {marginBottom: 15}]}>Select Soundtrack</Text>
            <SoundsRow row={0} />
            <SoundsRow row={1} />
            <SoundsRow row={2} />
            <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
                <TouchableOpacity style={styles.image} onPress={() => handleMute()}>
                    <Image source={volumeIcons[muted ? 'muted' : 'notMuted']} style={[styles.image, muted && {opacity: 0.7}]}/>
                </TouchableOpacity>
                <Slider
                    disabled={muted}
                    value={volume}
                    onValueChange={(vol) => updateVolume(vol)}
                    onSlidingComplete={(vol) => storeVolume(vol)}
                    style={{width: 260, marginLeft: 10}}
                    minimumValue={0.05}
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
        width: 105,
        height: 40,
        marginHorizontal: Dimensions.get('window').width * 0.1 - 30,
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
        bottom: 65,
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