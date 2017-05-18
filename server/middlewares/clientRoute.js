import React from 'react';
import { match, RouterContext } from 'react-router';
import routes from '../../client/routers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers/comment';
import ReactDOMServer from 'react-dom/server';
import CommentApp from '../../client/containers/CommentApp';
// ssr
const store = createStore(rootReducer);
async function clientRoute(ctx, next) {
    const htmlString = ReactDOMServer.renderToString(
        <Provider store={store}>
            <CommentApp />
        </Provider>
    );
    console.log('htmlString===================>', htmlString)
    // 渲染index.html
    await ctx.render('index.html', {
        html_data: htmlString,
        redux_data: store.getState()
    })
}
export default clientRoute;