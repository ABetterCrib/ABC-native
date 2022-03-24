import api from './index';
import user from './user';

class Rocker {
    async setRocker(setting) {
        if (user.getRocker() === setting) return;
        user.setRocker(setting);
        await api.call(`rocker/${setting}`, {method: 'POST'});
    }
}

export default new Rocker();