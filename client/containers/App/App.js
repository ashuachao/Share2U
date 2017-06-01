import React, { Component } from 'react';
// route
import { Provider } from 'react-redux';
import Routers from 'containers/Route/Route';
export default class App extends Component{
    render() {
        return (
            <Provider store={this.props.store}>
                <Routers/>
            </Provider>
        )
    }
}
