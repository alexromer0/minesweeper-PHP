const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = (env, options) => {
  const isDevelopment = options.mode === 'development';
  return {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/, /dist/],
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(s*)css$/,
          use: [
            {
              loader: MiniCSSExtractPlugin.loader
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          use: { loader: 'html-loader' }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    devServer: {
      hot: true,
      port: 8181,
      watchOptions: {
        ignored: [/node_modules/, /dist/]
      },
      contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCSSExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Minesweeper',
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html'
      })
    ]
  };
};
