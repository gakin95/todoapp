import { createStore, applyMiddleware,compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from "redux-thunk";
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './reducers';

const middlewares = [logger];

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['todos'] // only LoginUsers will be persisted
};

const pReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middlewares, ReduxThunk))
);

export const persistor = persistStore(store)