const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true,
    disable: process.env.NODE_ENV === 'development'
});

const webpackConfig = {
    entry: {
        app: [
            './src/index.jsx'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/build'),
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
                    loader: 'babel-loader'
                }]
            },{
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
                }]
            },{
                test: /\.(jpg|jpeg|gif|png)$/,
                use: [{
                    loader: 'url-loader?limit=1024&name=images/[name].[ext]'
                }]
            },{
                test: /\.ico$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            },{
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }))
            }
        ]
    },
    plugins: [
        extractSass,
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            title: 'Kanban',
            template: 'indexProd.html'
        })
    ]
};

module.exports = webpackConfig;
