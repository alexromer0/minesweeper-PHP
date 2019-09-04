const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /dist/],
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    'styles-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: {loader: 'html-loader'}
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        hot: true,
        port: 8181,
        watchOptions: {
            ignored: [/node_modules/, /dist/]
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCSSExtractPlugin({
            filename: '../public/assets/styles/[name].styles'
        }),
        new HtmlWebpackPlugin({
            title: 'Minesweeper',
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
};
