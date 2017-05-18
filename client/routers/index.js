import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CommentApp from '../containers/CommentApp';
const routes = (
    <Route>
        <IndexRoute component={ CommentApp }/>
    </Route>
)
export default routes;