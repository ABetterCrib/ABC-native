const BASE_URL = 'http://153.106.229.84:3000';
class Light {
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
    return fetch(`${BASE_URL}/${url}`, fetchOptions);
  }

  lightOn() {
    return this._callApi('light/on', {method: 'POST'});
  }

  lightOff() {
    return this._callApi('light/off', {method: 'POST'});
  }
}
export default new Light();