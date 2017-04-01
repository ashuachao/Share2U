// 基础webpack配置
const path = require('path');
module.exports = function() {
    return {
        entry: {
            main: '../server/mian.js'
        },
        output: {
            path: path.join(__dirname, '/../dist/asserts'),
            filename: '[name].bundle.js',
            publicPath: publicPath,
            sourceMapFilename: '[name].map'
        },
        resolve: {

        },
        modules: {
            rules: [{
                // js loader
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exculde: /node_modules/
            }, {
                // css loader
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }, {
                // 图片 loader
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }, {
                // 字体 loader
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            }]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({

            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new ExtractTextPlugin('styles.css')
        ]
    }
}