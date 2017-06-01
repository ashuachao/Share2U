import { createStore, applyMiddleware } from 'redux';
// observable的结合epics的middleware
import { createEpicMiddleware } from 'redux-observable';
import rootEpics from '../epics/index';
import rootReducer from '../reducers/index';
// log功能
import logger from 'redux-logger';
const REDUX_STATE = window.REDUX_STATE || {}
const epicMiddleware = createEpicMiddleware(rootEpics);
const store = createStore(
    rootReducer, 
    // REDUX_STATE,
    applyMiddleware(
        logger, 
        epicMiddleware
    )
)
export default store;