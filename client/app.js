// _ 开头的私有方法。
// 事件监听方法，handle*。
// ssr客户端还是会进行开销较小的二次渲染的
import 'rxjs';
import React, {Component} from 'react';
// jsx -> js对象 -> Dom元素,把reactDOM单独出来是因为有可能吧js对象渲染为DOM/APP
import ReactDOM from 'react-dom';
// fastclick 消除300ms延迟
import initReactFastclick from 'react-fastclick';
import store from './store/createStore';
import './style/animation.scss'
import './style/app.scss';
import './style/normalize.scss';
import { AppContainer } from 'react-hot-loader';
import App from 'containers/App/App'
// AppContainer is a necessary wrapper component for HMR
initReactFastclick();
ReactDOM.render(
    <AppContainer>
        <App store={store}/>
    </AppContainer>,
    document.getElementById('root')
)    
if (module.hot) {
    module.hot.accept('./containers/App/App.js', () => {
        const Next = require('./containers/App/App').default;
        ReactDOM.render(
            <AppContainer>
                <Next store={store} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}