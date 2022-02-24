class User {
    constructor() {
        this.cribname = 'Loading...';
        this.highbpm = 1000;
        this.lowbpm = 0;
    }

    async fill() {
        return fetch('https://rocky-meadow-51854.herokuapp.com/crib/Braden_Web')
        .then((response) => response.json())
        .then((json) => {
            this.cribname = json.cribname;
            this.highbpm = Number(json.highbpm);
            this.lowbpm = Number(json.lowbpm);
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

    // Getters
    getBpmLow() { return this.lowbpm }
    getBpmHigh() { return this.highbpm }
    getCribName() { return this.cribname }

    // Setters
    setBpmLow(bpm) {
        if (bpm < this.highbpm && bpm > 0) this.lowbpm = bpm;
    }
    setBpmHigh(bpm) {
        if (bpm > this.lowbpm) this.highbpm = bpm;
    }
    setCribName(name) {
        this.cribname = name;
    }
}

export default new User();