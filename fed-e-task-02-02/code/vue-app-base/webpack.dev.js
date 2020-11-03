const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname + '/public'),
  },
});
