import api from 'app/api';

const parkInfo = {
  get(park_name) {
    return api.request('GET', `/parks/${park_name}`)
  }
}

export default parkInfo