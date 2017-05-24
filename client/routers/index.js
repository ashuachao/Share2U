import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import CommentApp from 'containers/Comment/CommentApp';
import CommentInput from 'containers/Comment/CommentInput'
import Login from 'containers/Login/Login';
const RouterConfig = (
    <Router>
        <div className='container_router'>
            <Route path='/' exact component={CommentApp}/>
            <Route path='/Login' component={Login}/>
        </div>
    </Router>
)

export default class Routers extends Component{
    render() {
        return RouterConfig;
    }
}