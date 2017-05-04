const path = require('path');
const webpack = require('webpack');
// 自动补全css代码
const autoprefixer = require('autoprefixer');
// 自动生成html
const htmlWebpackPlugin = require('html-webpack-plugin');
// css像素转换rem
const px2rem = require('postcss-px2rem');
// css单独生成
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
// css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 自动压缩代码插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 自动在浏览器打开也卖弄
const WebpackBrowserPlugin = require('webpack-browser-plugin');
module.exports = {
    entry: {
        app: './src/app.js',
        chunk: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].bundle.js'
        //生产的html存放资源的路径
        //publicPath:'/static/'
    },
    resolve: {
        // 引入模块的时候 import xxx 没有带后缀
        // extension会进行后缀匹配 
        extensions: ['.js', '.vue', '.json'],
        // 配置别名 
        // 代替深层次的目录路径
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'containers': path.resolve(__dirname, 'src/containers'),
            'components': path.resolve(__dirname, 'src/components')
        },
        // 模块重命名
        modules: [
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            // 不需要babel编译的范围
            exclude: /node_modules/,
            // include: path.resolve(__dirname, 'src'), //打包的范围
            query: {
                presets: ['env', 'react']
            }
        }, {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            // 将css分离,不合并到js
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 开启css-module
                use: "css-loader?module=true!postcss-loader",
                
            })
        }, {
            test: /\.(png|jpg|gif|svg|jpeg)$/i,
            loader: 'url-loader',
            query: {
                limit: 20000,
                name: 'assets/[name]-[hash:5].[ext]'
            },
            exclude: /node_modules/
        }]
    },
    // webpack服务器
    devServer: {
        port: 8084,
        inline: true,
        hot: true
    },
    plugins: [
        // new WebpackBrowserPlugin(),
        // 迁移1到2的插件,如之前的exports.postcss可以写在这里
         new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [
                        autoprefixer, 
                        // px2rem({ remUnit: 37.5 })
                    ]
                }
            }
        }),
        new htmlWebpackPlugin({
            filename: 'index.html', //页面的生产名字
            template: 'index.html', //页面模板
            inject: 'body', //js的存放位置
            title: 'webpack demo', //网页title
            // chunks:['main','a'],//引入的js
            //excludeChunks:['b','c'],//排除的js
            minify:{//html页面压缩
                removeComments:true,//删除注释
                collapseWhitespace:true//删除空格
            }
        }),
        new ExtractTextPlugin('style.css'),
        // 压缩css
        new OptimizeCssAssetsPlugin({
            // 需要匹配的压缩的css
            // assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        // 压缩代码插件
        // new UglifyJsPlugin({
        //     compress: {
        //         // 警告信息开启
        //         warnings: true
        //     },
        //     // 警告对应到正确的代码行
        //     sourceMap: true,
        //     // // 压缩loaders    
        //     // minimize: true
        // }),
        new ExtractTextPlugin({
            filename: "style.[contenthash].css",
            disable: false,
            allChunks: true
        }),
        // 编译时创建一个全局变量,判断开发环境和生产环境
        new webpack.DefinePlugin({
            PRODUCTION: 'true'
        }),
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            // 将name对应entry的name,chunk代表的模块和入口模块的公共模块会被抽离出来放到chunk.js
            name: 'chunk',
            filename: 'chunk.js',
            minChunks: Infinity,
        })
    ]
}