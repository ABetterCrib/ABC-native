class User {
    constructor() {
        this.cribname = 'Loading...';
        this.highbpm = 1000;
        this.lowpbm = 0;
    }

    async fill() {
        return fetch('https://rocky-meadow-51854.herokuapp.com/crib/Braden%20Weber')
        .then((response) => response.json())
        .then((json) => {
            this.cribname = json.cribname;
            this.highbpm = json.highbpm;
            this.lowpbm = json.lowpbm;
        });
    }
}

export default new User();