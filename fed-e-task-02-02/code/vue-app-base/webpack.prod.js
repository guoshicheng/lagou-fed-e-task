const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: 'public/*' }] }),
  ],
});