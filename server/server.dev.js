// node 
import path from 'path';
import fs from 'fs';
// 加载webpack配置文件 
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import config from '../build/webpack.dev.js';
// mongoose 
import mongoose from 'mongoose';
// template
import views from 'koa-views';
// compress
import compress from 'koa-compress';
// convert 1 to 2
import convert from 'koa-convert';
// static asserts
import staticServer from 'koa-static';
// ssr
// import clientRoute from './middlewares/clientRoute'; 
// app
import app from './app';
import router from './routes/index';
mongoose.connect('mongodb://localhost/share2U', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success connect');
    }
})
const compiler = webpack(config);
app.use(staticServer(path.join(__dirname,'../dist/dev/client')));
app.use(views(path.resolve(__dirname, '../dist/dev/client/view'), {
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
app.use(convert(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    lazy: false,
    historyApiFallback: true,
    stats: {
        colors: true // 用颜色标识
    },
})));
app.use(convert(webpackHotMiddleware(compiler), {
    log: () => {}
}));
// app.listen(8888, () => {
//     const port = 8888;
//     console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
// })

