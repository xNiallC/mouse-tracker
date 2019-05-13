import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import waitTimesReducer from './waitTimes';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'primary',
  storage,
}

const appReducer = combineReducers({
  waitTimesReducer
})

const rootReducerPersist = persistReducer(persistConfig, appReducer)

export default rootReducerPersist