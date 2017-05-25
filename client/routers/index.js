import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { CommentApp, Login, NoMatch } from './router.bundle';
const RouterConfig = (
    <Router>
        <div className='container_router'>
            <Switch>
                <Route path='/' exact component={CommentApp}/>
                <Route path='/Login' component={Login}/>
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
)

export default class Routers extends Component{
    render() {
        return RouterConfig;
    }
}