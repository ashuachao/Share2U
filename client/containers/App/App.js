import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CommentApp, Login, NoMatch } from 'routers/router.bundle';
export default class App extends Component{
    render() {
        return (
            <div className='container_router'>
                <Switch>
                    <Route path='/' exact component={CommentApp}/>
                    <Route path='/Login' component={Login}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        )
    }
}