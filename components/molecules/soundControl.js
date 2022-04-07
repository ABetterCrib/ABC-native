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
        if (sound === chosen) return;

        // This is to disable choosing another song until this one has been handled
        setSongBeingChosen(true);
        setTimeout(() => setSongBeingChosen(false), 1100);

        // Heartbeat crashes at volumes above 0.9, so need to make a new maximum
        // These calculations are so the slider stays at the same spot even as the maximum changes
        if (sound === 'Heartbeat') {
            const newVol = Number((0.9 - (0.85 - 0.85 * volume) / 0.95).toFixed(6));
            storeVolume(newVol);
            updateVolume(newVol);
        } else if (chosen === 'Heartbeat') {
            const newVol = Number((1.0 - (0.95 * (0.9 - volume)) / 0.85).toFixed(6));
            storeVolume(newVol);
            updateVolume(newVol);
        }

        // Play the track on the pi
        if (!muted) {
            await Soundtrack.stop();
            if (sound !== 'None') {
                await Soundtrack.setTrack(sound);
            }
        }
        setChosen(sound);

        // Set variables in user, ship off to the database
        User.setSoundtrack(sound);
        User.pushSoundtrackToDatabase(sound);
    }

    const updateVolume = (vol) => {
        setVolume(vol);
        Soundtrack.setVolume(vol);
    }

    const storeVolume = async (vol) => {
        User.setVolume(vol);
        await User.pushVolumeToDatabase(vol);
    }

    const handleMute = async (m) => {
        if (!m) {
            await Soundtrack.setTrack(chosen);
        } else if (m && chosen !== 'None') {
            await Soundtrack.stop();
        }
        setMuted(m);
        User.setMuted(m);
    }

    return (
        <View style={styles.container}>
            <Text style={[Fonts.purpleHeader, {marginBottom: 15}]}>Select Soundtrack</Text>
            <SoundsRow row={0} />
            <SoundsRow row={1} />
            <SoundsRow row={2} />
            <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
                <TouchableOpacity style={styles.image} onPress={() => handleMute(!muted)}>
                    <Image source={volumeIcons[muted ? 'muted' : 'notMuted']} style={[styles.image, muted && {opacity: 0.7}]}/>
                </TouchableOpacity>
                <Slider
                    disabled={muted}
                    value={volume}
                    onValueChange={(vol) => updateVolume(vol)}
                    onSlidingComplete={(vol) => storeVolume(vol)}
                    style={{width: 260, marginLeft: 10}}
                    minimumValue={0.05}
                    maximumValue={chosen === 'Heartbeat' ? 0.9 : 1.0}
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