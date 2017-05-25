// 生产的时候 前端和服务端的代码都需要打包
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
// css精灵图
const Easysprites = require('postcss-easysprites');
// 自动因入库,不用每次import
const ProvidePlugin = webpack.ProvidePlugin;
const entry_browser = './client/app.js'
module.exports = {
    entry: {
        app: entry_browser
    },
    output: {
        path: path.resolve(__dirname, '../dist/dev/client'),
        filename: '[name]-[hash].bundle.js',
        //生产的html存放资源的路径
        // publicPath: path.resolve(__dirname, '../dist/dev/client'),
        // 导出的chunk的名字,按需加载的导出文件名字
        chunkFilename: '[name].chunk.js'
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
        rules: [{
            test: /\.(js|jsx)$/,
            // 不需要babel编译的范围
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: ["transform-decorators-legacy", "syntax-dynamic-import"]
                }
            }
        }, {
            // 对于私有css组件,使用css-module
            test: /\.scss$/,
            // 将css分离,不合并到js
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    // loader: "css-loader?module=true"
                    loader: "css-loader",
                    options: {
                        modules: true,//是否支持css-module
                        camelCase: true,//是否支持xxx-xxx
                        importLoaders: 1,//是否支持css import
                        localIdentName: '[name]_[local]'//css-module的命名方法
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer(), 
                            pxtorem({
                                rootValue: 100,
                                propWhiteList: []
                            }),
                            Easysprites({
                                imagePath: './imgs',
                                spritePath: './dist/imgs'
                            })
                        ]
                    }
                },
                {
                    loader: "sass-loader"
                }],
            include: [path.resolve(__dirname, '../client/containers'), path.resolve(__dirname, '../client/components')]
        }, {
            // 对于公共css组件,不使用css-module
            test: /\.scss$/,
            // 将css分离,不合并到js
                // 开启css-module
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer(), 
                            pxtorem({
                                rootValue: 100,
                                propWhiteList: []
                            }),
                            Easysprites({
                                imagePath: './imgs',
                                spritePath: './dist/imgs'
                            })
                        ]
                    }
                },
                {
                    loader: "sass-loader"
                }],
            include: path.resolve(__dirname, '../client/style')
        }, {
            // 对于公共css组件,不使用css-module
            test: /\.css$/,
            // 将css分离,不合并到js
                // 开启css-module
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: "css-loader"
                }
            ]
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
            loader: 'file-loader?name=[hash:12].[ext]'
        }, {
            // 图片大小小于20kb会返回dataURL
            test: /\.(png|jpg|gif|svg|jpeg)$/i,
            loader: 'url-loader',
            query: {
                limit: 2000,
                name: 'assets/[name]-[hash:5].[ext]'
            }
        }, {
            // 解决ejs模板解析不对的问题
            test: /\.html$/,
            use: {
                loader: 'html-loader?minimize=false'
            }
        }]
    },
    // webpack服务器
    devServer: {
        port: 8084,
        inline: true,
        hot: true,
        // compress: true
        contentBase: path.resolve(__dirname, '../dist/dev/client')
    },
    plugins: [
        // 热加载替换,和入口entry的reload对应,都会被传入开发服务器
        new webpack.HotModuleReplacementPlugin(),
        // 迁移1到2的插件,如之前的exports.postcss可以写在这里
        new webpack.LoaderOptionsPlugin({
            options: {
                // 定位到正确的代码,开发环境使用这个配置
                devtools: 'source-map',
                modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
            }
        }),
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
        // // 自动引入库
        // new ProvidePlugin({
            
        // })
        // 编译时创建一个全局变量,判断开发环境和生产环境
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
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
}