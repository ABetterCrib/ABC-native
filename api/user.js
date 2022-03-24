class User {
    constructor() {
        this.cribname = 'No_cribname_entered';
        this.password = 'No_password_entered';
        this.highbpm = 1000;
        this.lowbpm = 0;
        this.volume = 0.5;
        this.muted = true;
        this.soundtrack = 0;
        this.rockerPercent = 0;
    }

    async userExists(cribname, password) {
        const response = await fetch(`https://rocky-meadow-51854.herokuapp.com/crib/${cribname}/${password}`);
        return response.ok;
    }

    async fill(cribname, password) {
        return fetch(`https://rocky-meadow-51854.herokuapp.com/crib/${cribname}/${password}`)
        .then((response) => response.json())
        .then((json) => {
            this.cribname = json.cribname;
            this.password = json.password;
            this.highbpm = Number(json.highbpm);
            this.lowbpm = Number(json.lowbpm);
            this.volume = Number(json.volume);
            this.soundtrack = Number(json.soundtrack);
        });
    }

    // Need to add security on this function
    async pushBpmToDatabase() {
        return fetch(`https://rocky-meadow-51854.herokuapp.com/crib/bpm/${this.cribname}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lowbpm: this.lowbpm,
                highbpm: this.highbpm
            })
        });
    }

    async pushNameToDatabase(name) {
        return fetch(`https://rocky-meadow-51854.herokuapp.com/crib/name/${this.cribname}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cribname: name
            })
        }).then(() => this.cribname = name);
    }

    async pushVolumeToDatabase(vol) {
        return fetch(`https://rocky-meadow-51854.herokuapp.com/crib/volume/${this.cribname}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                volume: vol
            })
        });
    }

    async pushSoundtrackToDatabase(track) {
        return fetch(`https://rocky-meadow-51854.herokuapp.com/crib/soundtrack/${this.cribname}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                soundtrack: track
            })
        });
    }

    // Getters
    getBpmLow() { return this.lowbpm }
    getBpmHigh() { return this.highbpm }
    getCribName() { return this.cribname }
    getVolume() { return this.volume }
    getSoundtrack() { return this.soundtrack }
    getRocker() { return this.rockerPercent }
    getMuted() { return this.muted }

    // Setters
    setBpmLow(bpm) {
        if (bpm >= this.highbpm || bpm < 0) alert(`Invalid lower BPM cannot be set: ${bpm}`);
        else this.lowbpm = bpm;
    }
    setBpmHigh(bpm) {
        if (bpm <= this.lowbpm) alert(`Invalid higher BPM cannot be set: ${bpm}`);
        else this.highbpm = bpm;
    }
    setCribName(name) {
        this.cribname = name;
    }
    setVolume(vol) {
        if (vol < 0.0 || vol > 1.0) alert(`Invalid volume cannot be set: ${vol}`);
        else this.volume = vol;
    }
    setSoundtrack(track) {
        if (track < 0 || track > 8) alert(`Invalid soundtrack cannot be set: ${track}`);
        else this.soundtrack = track;
    }
    setRocker(rock) {
        if (rock < 0 || rock > 2) alert(`Invalid rocker percentage cannot be set: ${rock}`);
        else this.rockerPercent = rock;
    }
    setMuted(mute) {
        if (typeof mute !== 'boolean') alert(`Invalid muted state cannot be set: ${mute}`);
        else this.muted = mute;
    }
}

export default new User();
