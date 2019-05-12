import { combineReducers } from 'redux';
import waitTimesReducer from './waitTimes';

const appReducer = combineReducers({
  waitTimesReducer
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer