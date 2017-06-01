// webpack-merge
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const webpack = require('webpack');
// 自动补全css代码
const autoprefixer = require('autoprefixer');
// 自动生成html
const htmlWebpackPlugin = require('html-webpack-plugin');
// css像素转换rem
const pxtorem = require('postcss-pxtorem');
// css单独生成
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
// 自动因入库,不用每次import
const ProvidePlugin = webpack.ProvidePlugin;
module.exports = merge(baseConfig, {
    entry: {
        app: [
                'react-hot-loader/patch',
                'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false',
                './client/app.js'
            // 我们 app 的入口文件
            ]
    },
    output: {
        path: path.resolve(__dirname, '../assets/dev'),
        // chunkhash是单个文件的hash,hash是整个编译过程的hash
        // 用chunkhash可以增量更新
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        libraryTarget: 'umd',
        publicPath: '/'
        //生产的html存放资源的路径
        // publicPath: path.resolve(__dirname, '../dist/dev/client'),
        // 导出的chunk的名字,按需加载的导出文件名字
    },
    module: {
        rules: [ 
            {
                // 对于私有css组件,使用css-module
                test: /\.scss$/,
                // 将css分离,不合并到js
                use: [
                    { loader: 'style-loader' },
                    {   loader: "css-loader",
                        options: {
                            modules: true,//是否支持css-module
                            camelCase: true,//是否支持xxx-xxx
                            importLoaders: 1,//是否支持css import
                            localIdentName: '[name]_[local]'//css-module的命名方法
                        }
                    },
                    {   loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer(), 
                                pxtorem({
                                    rootValue: 100,
                                    propWhiteList: []
                                })
                            ]
                        }
                    },
                    { loader: "sass-loader" }
                ],
                include: [path.resolve(__dirname, '../client/containers'), path.resolve(__dirname, '../client/components')]
            }, 
            {
                // 对于公共css组件,不使用css-module
                test: /\.scss$/,
                // 将css分离,不合并到js
                    // 开启css-module
                use: [
                    { loader: 'style-loader' },
                    { loader: "css-loader" },
                    {   loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer(), 
                                pxtorem({
                                    rootValue: 100,
                                    propWhiteList: []
                                })
                            ]
                        }
                    },
                    { loader: "sass-loader" }
                ],
                include: path.resolve(__dirname, '../client/style')
            }, {
            // 对于公共css组件,不使用css-module
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                { loader: "css-loader" }
            ]
        },
        {
            // 解决ejs模板解析不对的问题
            test: /\.html$/,
            use: {
                loader: 'html-loader?minimize=false'
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                devtools: '#cheap-module-eval-source-map' 
            }
        }),
        // 热加载替换,和入口entry的reload对应,都会被传入开发服务器
        new webpack.HotModuleReplacementPlugin(),
        // 自动化生成html插件
        new htmlWebpackPlugin({
            filename: 'index.html', //页面的生产名字
            template: 'index.html', //页面模板
            inject: 'body', //js的存放位置
            title: 'webpack demo', //网页title
            minify:{//html页面压缩
                removeComments:true,//删除注释
                collapseWhitespace:true//删除空格
            }
        }),
        // 自动引入库,解析到key为赋值的变量的时候module自动加载value
        // 加载value的时候,上面配置的externals回去找全局的ReactDOM
        new ProvidePlugin({
            'react': 'react'
        }),
        // 提取公共模块(第三方库)
        new webpack.optimize.CommonsChunkPlugin({
            // 将name对应entry的name,chunk代表的模块和入口模块的公共模块会被抽离出来放到chunk.js
            name: 'chunk',
            filename: 'chunk.js',
            // 自动分离chunk
            // 不需要再entry里面定义chunk入口了
            minChunks: ({ resource }) => {
                return resource &&
                // resource代表加载模块的绝对路径
                // 判断条件:模块来自node_modules目录 && 以.js结尾
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            },
        }),
        // 将按需加载async的文件的公共的第三方引用库提取出来
        new webpack.optimize.CommonsChunkPlugin({
             // 所有的import()产生的chunk的公共模块提取出来
            async: 'common-in-lazy',
            minChunks: ({ resource } = {}) => (
                resource &&
                resource.includes('node_modules') &&
                /axios/.test(resource)
            ),
        }),
        // 将按需加载async的文件的公共代码提取出来
        new webpack.optimize.CommonsChunkPlugin({
            async: 'used-twice',
            minChunks: (module, count) => (
                count >= 2
            ),
        })
    ]
})