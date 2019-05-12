export const GET_WAIT_TIMES = 'GET_WAIT_TIMES'
export const REQUEST_WAIT_TIMES = 'REQUEST_WAIT_TIMES'

export const FAVOURITE_RIDE = 'FAVOURITE_RIDE'

import api from 'app/api';

export const requestWaitTimes = () => ({
  type: REQUEST_WAIT_TIMES
})

export const receiveWaitTimes = (park, waitTimes) => ({
  type: GET_WAIT_TIMES,
  park,
  waitTimes
})

export const getWaitTimes = (park) => {
  return (dispatch) => {
    dispatch(requestWaitTimes())
    return api.waitTimes.get(park)
      .then(({ attractions }) => dispatch(receiveWaitTimes(park, attractions)))
      .catch(() => dispatch(receiveWaitTimes(park, [])))
  }
}

export const favouriteRide = (park, rideId) => {
  return (dispatch) => { return dispatch({ type: FAVOURITE_RIDE, park, ride: rideId }) }
}