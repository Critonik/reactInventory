module.exports = {
    webpack: function (config) {
        if (config.mode === 'production') {
            config.optimization = {
                ...config.optimization,
                minimize: false,
            }
            config.output = {
                ...config.output,
                publicPath: ''
            }
        }
        console.log(config);
        return config;
    }
}