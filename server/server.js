// node 
import path from 'path';
import fs from 'fs';
// 加载webpack配置文件 
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import config from '../build/webpack.dev.js';
// mongoose 
// import mongoose from 'mongoose';
// import User from './db/Models/UserModel';
// template
import views from 'koa-views';
import compress from 'koa-compress';
// static asserts
import staticServer from 'koa-static';
// ssr
import clientRoute from './middlewares/clientRoute'; 
// app
import app from './app';
import router from './routes/index';
// const compiler = webpack(config);
app.use(staticServer(path.join(__dirname,'../assets/prod')));
app.use(views(path.resolve(__dirname, '../assets/view'), {
    map: {
        html: 'ejs'
    }
}));
app.use(compress({
    filter: function(content_type) {
        console.log(content_type)
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))
// app.use(clientRoute)
app.use(router.routes(), router.allowedMethods())
// app.use(webpackDevMiddleware(compiler, {
//     noInfo: true,
//     publicPath: config.output.publicPath,
//     hot: true,
//     lazy: false,
//     historyApiFallback: true,
//     stats: {
//         colors: true // 用颜色标识
//     },
// }));
// app.use(webpackHotMiddleware(compiler), {
//     log: () => {}
// });
app.listen(3000, () => {
    const port = 3000;
    console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
})
// mongoose.connect('mongodb://localhost/share2U', (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('success connect');
//     }
// })
