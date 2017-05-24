// _ 开头的私有方法。
// 事件监听方法，handle*。
// ssr客户端还是会进行开销较小的二次渲染的
import 'rxjs'
import React, {Component} from 'react';
// log功能
import logger from 'redux-logger'
// jsx -> js对象 -> Dom元素,把reactDOM单独出来是因为有可能吧js对象渲染为DOM/APP
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
// observable的结合epics的middleware
import { createEpicMiddleware } from 'redux-observable';
import rootEpics from './epics/index';
// fastclick 消除300ms延迟
import initReactFastclick from 'react-fastclick';
// route
import Routers from './routers/index';
// http fetch
import 'isomorphic-fetch';
import { Provider } from 'react-redux'
import rootReducer from './reducers/index';
import './style/animation.scss'
import './style/app.scss';
import './style/normalize.scss';
initReactFastclick();
const REDUX_STATE = window.REDUX_STATE || {}
const epicMiddleware = createEpicMiddleware(rootEpics);
const store = createStore(
    rootReducer, 
    // REDUX_STATE,
    applyMiddleware(logger, epicMiddleware)
)
ReactDOM.render(
    <Provider store={store}>
        <Routers/>
    </Provider>, 
    document.getElementById('root')
)    
 
 