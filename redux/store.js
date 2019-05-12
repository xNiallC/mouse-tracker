import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();

export default createStore(
  reducers,
  composeEnhancer(
    applyMiddleware(
      thunkMiddleware,
      logger  
    )
  )
)
