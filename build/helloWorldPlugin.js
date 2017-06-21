function HelloCompilationPlugiin(options) {

}
HelloCompilationPlugiin.prototype.apply = function (compiler) {
    // plugin会注册hook函数数组
    compiler.plugin('emit', function(compilation, callback) {
        var filelist = 'In this build: \n\n';
        for (var filename in compilation.assets) {
            filelist += ('- ' + filename + '\n');
        }
        compilation.assets['filelist.md'] = {
            source: function() {
                return filelist;
            },
            size: function() {
                return filelist.length
            }
        }
        callback();
    })
}
module.exports = HelloCompilationPlugiin;
