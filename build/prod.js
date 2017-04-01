// 生产环境的webpack配置
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
module.exports = function() {
    return webpackMerge(commonConfig(), {
        plugins: [
            new webpack.definePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ]
    })
}
