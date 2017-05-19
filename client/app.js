// // 请求数据流
// var requestStream = Rx.Observable.just('https://api.github.com/users');
// // 只是返回一个promise
// var responseMetastream = requestStream.map((requestUrl) => {
//     return Rx.Observable.fromPromise($.getJSON(requestUrl));
// })

// // flatmap主动emit
// var responseStream = requestStream.flatMap((requestUrl) =>{
//     return Rx.Observable.fromPromise($.getJSON(requestUrl));
// })
// responseStream.subscribe((response) => {

// })

// var refreshBtn = document.querySelector('.reflesh');
// var close1Btn = document.querySelector('.close1');
// var close1ClickStream = Rx.Observable.fromEvent(close1Btn, 'click');
// var refleshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click');
// var refleshRequestStream = refleshClickStream.map(() => {
//     var randomOffset = Math.floor(Math.random()*500);
//     return 'https://api.github.com/users?since=' + randomOffset;
// })
// var startRequestStream = Rx.Observable.just('https://api.github.com/users');
// // 编程一个流
// var requestStream = Rx.Observable.merge(
//     startRequestStream, refleshClickStream
// )

// var suggestion1Stream = responseStream
//     .map(function(listUsers) {
//     // get one random user from the list
//     return listUsers[Math.floor(Math.random()*listUsers.length)];
// }).merge(
//     refleshClickStream.map(() => {
//         return null;
//     })
// ).startWith(null);
// suggestion1Stream.subscribe(function(suggestion) {
//     if (suggestion === null) {
//     // hide the first suggestion DOM element
//     }
//     else {
//     // show the first suggestion DOM element
//     // and render the data
//     }
// });

// let todo = document.getElementById('todo');
// let addBtn = document.getElementById('addBtn');
// let weight = document.getElementById('weight');
// let height = document.getElementById('height');
// let weight$ = Rx.Observable.fromEvent(weight, 'keyup');
// let height$ = Rx.Observable.fromEvent(height, 'keyup');
// let btnClick$ = Rx.Observable.fromEvent(addBtn, 'click').mapTo('click');
// btnClick$.subscribe((input) => {
//     console.log(input);
// })
// let input$ = Rx.Observable.fromEvent(todo, 'keyup');
// input$.subscribe((input) => {
//     console.log(input.target.value);
// })
// // 合成最近的值
// Rx.Observable.combineLatest(weight$, height$, (w, h) => {
//     return w.target.value/h.target.value;
// }).subscribe((output) => {
//     console.log(output);
// })

// const $getData = Rx.Observable.interval(1000).publishReplay(3).refCount()


import 'rxjs'
import React, {Component} from 'react';
// log功能
import logger from 'redux-logger'
// jsx -> js对象 -> Dom元素,把reactDOM单独出来是因为有可能吧js对象渲染为DOM/APP
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
// observable的结合epics的middleware
import { createEpicMiddleware } from 'redux-observable';
import { rootEpics } from './epics/index';
// fastclick 消除300ms延迟
import initReactFastclick from 'react-fastclick';
initReactFastclick();
import { Provider } from 'react-redux'
import commentsReducer from './reducers/comment';
import CommentApp from './containers/CommentApp';
import './style/animation.scss'
import './style/app.scss';
const REDUX_STATE = window.REDUX_STATE || {}
console.log(REDUX_STATE)
const epicMiddleware = createEpicMiddleware(rootEpics);
const store = createStore(
    commentsReducer, 
    REDUX_STATE,
    applyMiddleware(logger, epicMiddleware)
)
ReactDOM.render(
    <Provider store={store}>
        <CommentApp/>
    </Provider>, 
    document.getElementById('root')
)    
 
 