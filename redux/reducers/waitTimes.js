import {
  GET_WAIT_TIMES,
  REQUEST_WAIT_TIMES,
  FAVOURITE_RIDE,
} from '../actions/waitTimes';

const initialState = {
  fetching: false,
  magicKingdom: {
    waitTimes: [],
    favourites: []
  },
  animalKingdom: {
    waitTimes: [],
    favourites: []
  },
  epcot: {
    waitTimes: [],
    favourites: []
  },
  hollywoodStudios: {
    waitTimes: [],
    favourites: []
  },
  universalStudios: {
    waitTimes: [],
    favourites: []
  },
  islandsOfAdventure: {
    waitTimes: [],
    favourites: []
  }
}

const waitTimesReducer = (state = initialState, action) => {
  if(action.park && !state[action.park]) return { ...state }
  switch(action.type) {
    case REQUEST_WAIT_TIMES:
      return { ...state, fetching: true }
    case GET_WAIT_TIMES:
      const { park, waitTimes } = action;
      return {
        ...state,
        [park]: {
          ...state[park],
          waitTimes
        },
        fetching: false
      }
    case FAVOURITE_RIDE:
      const { favourites } = state[action.park]
      const existingFavourite = favourites.find(f => f === action.ride);
      if(existingFavourite) {
        const filteredFavourites = favourites.filter(f => f !== action.ride);
        return {
          ...state,
          [action.park]: {
            ...state[action.park],
            favourites: filteredFavourites
          }
        }
      } else {
        return {
          ...state,
          [action.park]: {
            ...state[action.park],
            favourites: [...state[action.park].favourites, action.ride]
          }
        }
      }
    default: return state
  }
}

export default waitTimesReducer;



