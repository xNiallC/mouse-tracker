import api from 'app/api';

const waitTimes = {
  get(park_name) {
    return api.request('GET', `/parks/${park_name}/attractions`)
  },
}

export default waitTimes