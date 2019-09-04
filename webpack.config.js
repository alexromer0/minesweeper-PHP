const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve('src/js', 'index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundlefile.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        port: 8181
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Minesweeper'
        })
    ]
};