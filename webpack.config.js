const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  name: 'planner-web-app',
  mode: 'development',

  entry: {
    app:'./src/index.js',
  },

  devServer: {
    contentBase:        './dist',
    historyApiFallback: true,
    hot:                true,
  },

  resolve: {
    alias: {
      joi: 'joi-browser',
    },
    modules: [ 'src/', 'node_modules' ],
  },

  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new HtmlWebpackPlugin({
      title: 'Planner',
      template: 'src/index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  output: {
    filename:   '[name].bundle.js',
    path:       path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test:    /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@instructure'),
        ],

        use: {
          loader:  'babel-loader',
          options: {
            presets: [ 'stage-0', 'react' ],
            plugins: [ 'transform-export-extensions' ],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules:        true,
              importLoaders:  1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ],
      },
    ],
  }
};
