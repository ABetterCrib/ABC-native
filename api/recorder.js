import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Api from '.';
const RNFS = require('react-native-fs');

class Recorder {
    constructor() {
        this.recorder = new AudioRecorderPlayer();
    }

    async startRecorder() {
        console.log('Starting recording');
        await this.recorder.startRecorder(RNFS.CachesDirectoryPath.concat('/test.mp4'));
        setTimeout(() => this.stopRecorder(), 5000);
    }

    async stopRecorder() {
        console.log('Stopping recording');
        await this.recorder.stopRecorder();
        const soundClip = await RNFS.readFile(RNFS.CachesDirectoryPath.concat('/test.mp4'), 'base64');
        Api.call(`speaking`, {method: 'POST', body: {data: soundClip}});
    }
}

export default new Recorder();