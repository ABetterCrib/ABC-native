import BASE_IP from "./ip";

const BASE_URL = BASE_IP.concat(':3000');

class Api {
  call(url, options = {}) {

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
    return fetch(`${BASE_URL}/${url}`, fetchOptions);
  }
}

export default new Api()