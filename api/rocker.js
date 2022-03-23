import User from "./user"

class Rocker {

    constructor() {

    }

    _callApi(url, options = {}) {

        const fetchOptions = {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          ...options,
        };
    
        if (options.body) {
          fetchOptions.body = JSON.stringify(options.body);
        }
    
        console.log(`${fetchOptions.method} request to /${url} ${fetchOptions.body ? `with body: ${fetchOptions.body}` : ''}`);
        return fetch(`${BASE_URL}/rocker`, fetchOptions);
    }

    setState(state) {
        // definintion

    }

}

export default new Rocker();