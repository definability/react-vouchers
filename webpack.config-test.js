const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'node',
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /app\/.*\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]
      }),
    }, {
      test: /\.svg$/,
      use: 'file-loader',
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('app'),
      path.resolve('node_modules'),
    ],
  }
};
