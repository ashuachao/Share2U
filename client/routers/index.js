import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'containers/App/App';
export default class Routers extends Component{
    render() {
        return (
            <Router>
                <App/>
            </Router>
        )
    }
}