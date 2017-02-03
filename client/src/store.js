import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from 'reducers';

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, logger, promiseMiddleware()));

export default store;