import React, { Component } from 'react';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CommentApp from '../containers/CommentApp';
import LogMsg from '../components/LogMsg';
const RouterConfig = (
    <Router>
        <div>
            <Route path='/LogMsg' component={LogMsg}/>
        </div>
    </Router>
)

export default class Routers extends Component{
    render() {
        return RouterConfig;
    }
}