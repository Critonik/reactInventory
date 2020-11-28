const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    webpack: function (config) {
        if (config.mode === 'production') {
            config.optimization = {
                ...config.optimization,
                minimize: false,
                splitChunks: {
                    ...config.optimization.splitChunks,
                    chunks: 'async'
                },
                minimizer: [
                    ...config.optimization.minimizer,
                    new OptimizeCssAssetsPlugin({
                        ...config.optimization.minimizer[1],
                    })
                ]
            }
            config.output = {
                ...config.output,
                chunkFilename: 'static/js/[name].js',
                publicPath: '',
                filename: 'static/js/[name].js'
            }
            config.plugins[0].options.minify = {
                ...config.plugins[0].options.minify,
                minifyJS: false,
                minifyCSS: false,
                minifyURLs: false
            }
            config.plugins[5].options = {
                filename: 'static/css/[name].css',
                ignoreOrder: false,
                chunkFilename: 'static/css/[name].chunk.css',
                publicPath: '..'
            }
        }
        return config;
    }
}