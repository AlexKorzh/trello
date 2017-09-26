let ExtractTextPlugin = require('extract-text-webpack-plugin'), 
    webpack = require('webpack'),
    path = require('path');

let extractSass = new ExtractTextPlugin({
    // define where to save the file
    filename: 'bundle.css',
    allChunks: true,
    disable: process.env.NODE_ENV === "development",
});

webpackConfig = {
    entry: {
        entry: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass
    ]
};
module.exports = webpackConfig;