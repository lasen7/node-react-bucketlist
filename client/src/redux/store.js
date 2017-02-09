import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import modules from './modules';

const logger = createLogger();
const store = createStore(modules, applyMiddleware(thunk, logger, promiseMiddleware()));

export default store;