const path = require('path');

module.exports = {
  target: 'node',
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
