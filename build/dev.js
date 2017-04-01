// 开发环境的webpack配置
const path = require('path');
module.exports = function(env) {
    return {
        devtools: 'cheap-module-source-map',
        output: {
            path: path.join(__dirname, '/../dist/assert'),
            filename: '[name].bundle.js',//根据入口文件决定
            publicPath: publicPath,
            sourceMapFilename: '[name].map'
        },
        devsServer: {
            port: 7777,
            host: 'localhost',
            historyApiFallback: true,
            noInfo: false,
            stats: 'minimal',
            publicPath: publicPath
        }
    }
}