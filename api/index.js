const BASE_URL = 'http://153.106.168.127:3000';

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