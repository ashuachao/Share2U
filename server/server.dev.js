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
// session
import session from 'koa-session';
// convert 1 to 2
import convert from 'koa-convert';
// static asserts
import staticServer from 'koa-static';
// router
import router from './routes/index';
// ssr
// import clientRoute from './middlewares/clientRoute'; 
mongoose.connect('mongodb://localhost/share2U', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success connect');
    }
})
// app
import app from './app';
const compiler = webpack(config);
// session config
app.keys = ['secret key'];
const CONFIG = {
    key: 'koa:sess_test',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true 
}
app.use(session(CONFIG, app));
// static assert
app.use(staticServer(path.join(__dirname,'../dist/dev/client')));
// views template
app.use(views(path.resolve(__dirname, '../dist/dev/client/view'), {
    map: {
        html: 'ejs'
    }
}));
// gzip
app.use(compress({
    filter: function(content_type) {
        console.log(content_type)
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))
// router config
app.use(router.routes()).use(router.allowedMethods())
// hot load
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
// listen
app.listen(8888, () => {
    const port = 8888;
    console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
})

