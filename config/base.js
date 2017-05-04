'use strict'
const path = require('path'),
    os = require('os'),
    webpack = require('webpack'),
    // 文件的存放目录
    __basename = path.dirname(__dirname),
    // 执行命令附带的NODE_ENV参数
    __env = process.env.NODE_ENV,
    isProduction = __env === 'production';

var srcPath = path.resolve(__basename, 'src'),
    distPath = path.resolve(__basename, 'dist');

// 基本的配置项
var config = {
    env: __env,
    webpack: {
        // 项目路径
        path: {
            srcPath: srcPath,
            distPath: distPath
        },
        // 开发服务器配置
        webserver: 'http://localhost:3000'
        // 
    }
}