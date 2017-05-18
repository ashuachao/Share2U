// node 
import path from 'path';
import fs from 'fs';
// 加载webpack配置文件 
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import config from '../build/webpack.dev.js';
import hook from 'css-modules-require-hook';
// mongoose 
import mongoose from 'mongoose';
import User from './db/Models/UserModel';
// template
import views from 'koa-views'
// static asserts
import staticServer from 'koa-static';
// ssr
import clientRoute from './middlewares/clientRoute'; 
// app
import app from './app';
import router from './routes/index';
// hook({
//     extensions: ['.scss'],
//     preprocessCss: (data, filename) =>
//         require('node-sass').renderSync({
//             data,
//             file: filename
//         }).css,
//     camelCase: true,
//     generateScopedName: '[name]__[local]__[hash:base64:8]'
// })
// const compiler = webpack(config);
app.use(views(path.resolve(__dirname, '../views'), {
    map: {
        html: 'ejs'
    }
}));
app.use(staticServer(path.join(__dirname,'../dist')));
app.use(router.routes(), router.allowedMethods())
app.use(clientRoute)
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