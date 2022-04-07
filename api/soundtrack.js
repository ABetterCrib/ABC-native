import User from "./user";
import api from './index';

class Soundtrack {
    async setTrack(track) {
        console.log('Setting track:', track);
        if (track === 'None') return;
        await api.call(`soundtrack/track/${track}`, {method: 'POST'});
    }

    async setVolume(vol) {
        console.log('Setting volume', vol);
        // User is handled only when volume is released
        await api.call(`soundtrack/volume/${vol}`, {method: 'POST'});
    }

    async stop() {
        console.log('Stopping soundtrack');
        await api.call(`soundtrack/stop`, {method: 'POST'});
        setTimeout(async () => {
            await api.call(`soundtrack/clearStop`, {method: 'POST'});
        }, 500)
    }

    async clearStop() {
        console.log('Clearing stop soundtrack');
        await api.call(`soundtrack/clearStop`, {method: 'POST'});
    }
}

export default new Soundtrack();