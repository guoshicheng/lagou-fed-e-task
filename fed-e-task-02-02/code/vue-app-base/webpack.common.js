const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/bundle.js',
  },
  mode: 'none',
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { esModule: false } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { esModule: false } },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10240,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue-app-simple',
      template: path.join(__dirname + '/public/index.html'),
    }),
    new webpack.DefinePlugin({
      BASE_URL: "'/'",
    }),
  ],
  resolve: {
    alias: { vue$: 'vue/dist/vue.esm.js' },
  },
};
