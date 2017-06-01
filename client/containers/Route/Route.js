import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CommentApp, Login, NoMatch, Uploader } from 'routers/router.bundle';
export default class Routers extends Component{
    render() {
        return (
            <Router>
                <div className='container_router'>
                    <Switch>
                        <Route path='/' exact component={CommentApp}/>
                        <Route path='/Login' component={Login}/>
                        <Route path='/Uploader' component={Uploader}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}