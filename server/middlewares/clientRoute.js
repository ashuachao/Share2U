import React from 'react';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers/comment';
import ReactDOMServer from 'react-dom/server';
import App from '../../dist/prod/bundle';
const initial_server_data = {
    comments: [
        {
            username: 'test1',
            content: 'content1'
        }
    ]
}
// ssr
const store = createStore(rootReducer, initial_server_data);
const initial_data = store.getState();
console.log(initial_data)
async function clientRoute(ctx, next) {
    const htmlString = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );
    console.log('htmlString===================>', htmlString)
    // 渲染index.html
    await ctx.render('index.html', {
        html_data: htmlString,
        redux_data: initial_data
    })
}
export default clientRoute;