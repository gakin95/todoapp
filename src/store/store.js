import { createStore, applyMiddleware,compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from "redux-thunk";
import logger from 'redux-logger'
import { persistStore } from 'redux-persist';
import appReducer from './reducers';

const middlewares = [logger]

export const store = createStore(
    appReducer,
  composeWithDevTools(applyMiddleware(...middlewares, ReduxThunk))
);

export const persistor = persistStore(store)