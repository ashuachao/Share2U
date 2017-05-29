import React from 'react';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../client/reducers/comment';
import ReactDOMServer from 'react-dom/server';
import App from '../../assets/server/bundle';
import { StaticRouter } from 'react-router-dom';
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
// console.log(initial_data)
async function clientRoute(ctx, next) {
    const context = {}
    const htmlString = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter
                location={ctx.url}
                context={context}
            >
                <App/>
            </StaticRouter>
        </Provider>
    )
    if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        redirect(301, context.url)
    } else {
        // we're good, send the response
        console.log('htmlString===================>', htmlString)
        // 渲染index.html
        await ctx.render('index.html', {
            html_data: htmlString,
            redux_data: initial_data
        })
    }
        // const htmlString = ReactDOMServer.renderToString(
        //     <Provider store={store}>
        //         <App />
        //     </Provider>
        // );
}
export default clientRoute;