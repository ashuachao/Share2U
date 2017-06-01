// 生产的时候 前端和服务端的代码都需要打包
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
// css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// css精灵图
const Easysprites = require('postcss-easysprites');
// 自动压缩代码插件
const os = require('os');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// 开启gzip
const CompressionPlugin = require("compression-webpack-plugin");
// 自动因入库,不用每次import
const ProvidePlugin = webpack.ProvidePlugin;
// 不打包node_module
const nodeExternals = require('webpack-node-externals');
const entry_server = './client/containers/App/App';
const browserConfig = merge(baseConfig, {
    module: {
        rules: [
            {
                // 对于私有css组件,使用css-module
                test: /\.scss$/,
                // 将css分离,不合并到js
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // 开启css-module
                    use: [
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
                                    }),
                                    Easysprites({
                                        imagePath: './client/images',
                                        spritePath: './assets/imgs_sprite'
                                    })
                                ]
                            }
                        },
                        { loader: "sass-loader" }
                    ],
                }),
                include: [path.resolve(__dirname, '../client/containers'), path.resolve(__dirname, '../client/components')]
            }, 
            {
                // 对于公共css组件,不使用css-module
                test: /\.scss$/,
                // 将css分离,不合并到js
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // 开启css-module
                    use: [
                        { loader: "css-loader" },
                        {   loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer(), 
                                    pxtorem({
                                        rootValue: 100,
                                        propWhiteList: []
                                    }),
                                    Easysprites({
                                        imagePath: './client/images',
                                        spritePath: './assets/prod/imgs_sprite'
                                    })
                                ]
                            }
                        },
                        { loader: "sass-loader" }
                    ],
                }),
                include: path.resolve(__dirname, '../client/style')
            }, 
            {
                test: /\.css$/,
                // 将css分离,不合并到js
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: "css-loader" }
                    ],
                })
            }, 
            {
                // 解决ejs模板解析不对的问题
                test: /\.html$/,
                use: { loader: 'html-loader?minimize=false' }
            }
        ]
    },
    plugins: [
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
        // 提取css代码  bug?生成路径变为css/style.css, 里面引用的图片路径不会响应地改变
        new ExtractTextPlugin({
            filename: "style.css?[contenthash]",
            disable: false,
            allChunks: true
        }),
        // 自动引入库,解析到key为赋值的变量的时候module自动加载value
        // 加载value的时候,上面配置的externals回去找全局的ReactDOM
        new ProvidePlugin({
            'react': 'react'
        }),
        // 编译时创建一个全局变量,判断开发环境和生产环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        // 提取公共模块(第三方库)
        new webpack.optimize.CommonsChunkPlugin({
            // 将name对应entry的name,chunk代表的模块和入口模块的公共模块会被抽离出来放到chunk.js
            name: 'chunk',
            filename: 'chunk.js?[chunkhash]',
            // 自动分离chunk
            // 不需要再entry里面定义chunk入口了
            minChunks: ({ resource }) => (
                resource &&
                // resource代表加载模块的绝对路径
                // 判断条件:模块来自node_modules目录 && 以.js结尾
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            )
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['chunk']
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
        }),
         // 压缩css
        new OptimizeCssAssetsPlugin({
            // 需要匹配的压缩的css
            // assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        // 压缩代码插件
        new UglifyJsPlugin({
            compress: {
                // 警告信息开启
                warnings: true,
                // 删除所有console
                drop_console: true    
            },
            // 删除所有注释
            comments: false,
            // 警告对应到正确的代码行
            // sourceMap: true,
            // // 压缩loaders    
            // minimize: true
        })
    ]
})
const serverConfig = merge(baseConfig, {
    entry: entry_server,
    output: {
        path: path.resolve(__dirname, '../assets/server'),
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
        //设置导出类型，web端默认是var，node需要module.exports = xxx的形式  
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: false
    },
    module: {
        rules: [
            {
                // 对于私有css组件,使用css-module
                test: /\.scss$/,
                use: [
                    {
                        // 只需要导出css-module的映射关系,不需嵌入css,解决node端不解析css的问题
                        // loader: "css-loader/locals?module=true"
                        loader: 'css-loader/locals',
                        options: {
                            modules: true,
                            camelCase: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]'
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ],
                include: [path.resolve(__dirname, '../client/containers'), path.resolve(__dirname, '../client/components')]
            }, 
            {
                // 对于公共css组件,不使用css-module
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader/locals" }
                ],
            }, 
            {
            // 对于公共css组件,不使用css-module
                test: /\.scss$/,
                use: [
                    { loader: "css-loader/locals" },
                    { loader: "sass-loader" }
                ],
                include: path.resolve(__dirname, '../client/style')
            }, 
        ]
    },
    externals: [nodeExternals()]
})
module.exports = [browserConfig, serverConfig]