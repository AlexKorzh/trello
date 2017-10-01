const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true,
    disable: process.env.NODE_ENV === 'development'
});

const webpackConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.jsx'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'react-hot-loader/webpack'
                }, {
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    configFile: path.join(__dirname, '.eslintrc')
                }
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }, {
                test: /\.ico$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            }, {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }))
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        extractSass
    ]
};

module.exports = webpackConfig;
