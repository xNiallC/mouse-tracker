import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();

export const store = createStore(
  reducers,
  composeEnhancer(
    applyMiddleware(
      thunkMiddleware,
      logger  
    )
  )
)

export const persistor = persistStore(store)
