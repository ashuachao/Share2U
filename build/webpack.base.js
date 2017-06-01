// 生产的时候 前端和服务端的代码都需要打包
const path = require('path');
const webpack = require('webpack'); 
const entry_browser = './client/app.js'
module.exports = {
    entry: {
        app: entry_browser
    },
    output: {
        path: path.resolve(__dirname, '../assets'),
        // chunkhash是单个文件的hash,hash是整个编译过程的hash
        // 用chunkhash可以增量更新
        filename: '[name].bundle.js?[hash]',
        chunkFilename: '[name].chunk.js?[chunkhash]',
        libraryTarget: 'umd'
        //生产的html存放资源的路径
        // publicPath: path.resolve(__dirname, '../dist/dev/client'),
        // 导出的chunk的名字,按需加载的导出文件名字
    },
    // 使用外部扩展,webpack解析key的时候,默认使用外部的扩展
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'axios',
        'redux': 'Redux',
        'react-router-dom': 'ReactRouterDOM'
    },
    resolve: {
        // 引入模块的时候 import xxx 没有带后缀
        // extension会进行后缀匹配 
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
        // 配置别名 
        // 代替深层次的目录路径
        alias: {
            '@': path.resolve(__dirname, '../client'),
            'containers': path.resolve(__dirname, '../client/containers'),
            'components': path.resolve(__dirname, '../client/components'),
            'reducers': path.resolve(__dirname, '../client/reducers'),
            'images': path.resolve(__dirname, '../client/images'),
            'util': path.resolve(__dirname, '../client/util'),
            'routers': path.resolve(__dirname, '../client/routers')
        },
        // 模块重命名
        modules: [
            path.resolve(__dirname, '../client'),
            path.resolve(__dirname, '../node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // 不需要babel编译的范围
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, 
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
                loader: 'file-loader',
                query: {
                    // [ext]文件后缀
                    name: 'svg/[hash:12].[ext]'
                }
            }, 
            {
                // 图片大小小于20kb会返回dataURL
                test: /\.(png|jpg|gif|svg|jpeg|webp)$/i,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'imgs/[name]-[hash:5].[ext]'
                }
            }
        ]        
    }
}