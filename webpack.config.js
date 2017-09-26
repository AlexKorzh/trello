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
    devtool: 'inline-source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', 'jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    configFile: path.join(__dirname, '.eslintrc.js'),
                },
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader',
                }],
            }, {
                test: /\.ico$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]',
                }],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        extractSass
    ]
};

module.exports = webpackConfig;