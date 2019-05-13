import waitTimes from './waitTimes'

const apiUri = 'http://192.168.0.14:5001'

const api = {
  req(method, path, headers, data) {
    return fetch(`${apiUri}/api/${path}`, { method, body: data && JSON.stringify(data), headers })
      .then(res => (res.ok
        ? res
        : new Promise((_, reject) => res.json()
          .then(err => reject(err.message))
          .catch(() => reject('Could not parse error')))))
      .then(res => res.json());
  },

  request(method, path, data) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    return api.req(method, path, headers, data);
  },

  waitTimes
};

export default api;