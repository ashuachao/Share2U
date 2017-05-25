import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
@withRouter
export default class NoMatch extends Component{
    render() {
        const { location } = this.props;
        return (
            <div>this is a 404 page{location.pathname}</div>
        )
    }
}