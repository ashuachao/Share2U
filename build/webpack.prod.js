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
// 自动压缩代码插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 自动因入库,不用每次import
const ProvidePlugin = webpack.ProvidePlugin;
const browserConfig = {
    entry: {
        app: [   
            './client/app.js'
        ]
        // chunk: ['react', 'react-dom', 'axios']
    },
    output: {
        path: path.resolve(__dirname, '../dist/dev'),
        filename: '[name]-[hash].bundle.js',
        //生产的html存放资源的路径
        //publicPath:'/static/'
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
            '@': path.resolve(__dirname, 'client'),
            'containers': path.resolve(__dirname, 'client/containers'),
            'components': path.resolve(__dirname, 'client/components'),
            'images': path.resolve(__dirname, 'client/imags')
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
                    plugins: ["transform-decorators-legacy"]
                }
            }
        }, {
            // 对于私有css组件,使用css-module
            test: /\.scss$/,
            // 将css分离,不合并到js
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 开启css-module
                use: [
                    {
                        loader: "css-loader?module=true"
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: "sass-loader"
                    }],
            }),
            include: path.resolve(__dirname, '../client/containers')
        }, {
            // 对于公共css组件,不使用css-module
            test: /\.scss$/,
            // 将css分离,不合并到js
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 开启css-module
                use: [
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: "sass-loader"
                    }],
            }),
            include: path.resolve(__dirname, '../client/style')
        }, {
            test: /\.css$/,
            // 将css分离,不合并到js
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 开启css-module
                // use: "css-loader?module=true!postcss-loader",
                use: "css-loader!postcss-loader",
            })
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
        }]
    },
    node: {
        fs: 'empty'
    },
    // webpack服务器
    devServer: {
        port: 8084,
        inline: true,
        hot: true,
        // compress: true
    },
    plugins: [
        // 热加载替换,和入口entry的reload对应,都会被传入开发服务器
        new webpack.HotModuleReplacementPlugin(),
        // 迁移1到2的插件,如之前的exports.postcss可以写在这里
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [
                        autoprefixer, 
                        pxtorem({
                            rootValue: 100,
                            propWhiteList: []
                        })
                    ]
                },
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
        // 提取css代码
        new ExtractTextPlugin({
            filename: "style.[contenthash].css",
            disable: false,
            allChunks: true
        }),
        // // 自动引入库
        // new ProvidePlugin({
            
        // })
        // 编译时创建一个全局变量,判断开发环境和生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        // 提取公共模块(第三方库)
        new webpack.optimize.CommonsChunkPlugin({
            // 将name对应entry的name,chunk代表的模块和入口模块的公共模块会被抽离出来放到chunk.js
            name: 'chunk',
            filename: 'chunk.js',
            // 自动分离chunk
            // 不需要再entry里面定义chunk入口了
            minChunks: ({ resource }) => (
                resource &&
                // resource代表加载模块的绝对路径
                // 判断条件:模块来自node_modules目录 && 以.js结尾
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            ),
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
                warnings: true
            },
            // 警告对应到正确的代码行
            sourceMap: true,
            // // 压缩loaders    
            // minimize: true
        })
    ]
}
const serverConfig = {
    entry: './server/server.js',
    output: {
        path: path.resolve(__dirname, '../dist/prod'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].chunk.js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: false
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
                    plugins: ["transform-decorators-legacy"]
                }
            }
        }, {
            // 对于私有css组件,使用css-module
            test: /\.scss$/,
            // 将css分离,不合并到js
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 开启css-module
                use: [
                    {
                        loader: "css-loader/locals?module=true"
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: "sass-loader"
                    }],
            }),
            include: path.resolve(__dirname, '../client/containers')
        }, {
            // 对于公共css组件,不使用css-module
            test: /\.scss$/,
            // 将css分离,不合并到js
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 开启css-module
                use: [
                    {
                        loader: "css-loader/locals"
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: "sass-loader"
                    }],
            }),
            include: path.resolve(__dirname, '../client/style')
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
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // 警告信息开启
                warnings: true
            },
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    ]
}
module.exports = [browserConfig, serverConfig]