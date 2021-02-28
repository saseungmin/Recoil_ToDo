const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEVELOPMENT_ENV = 'development';
const PRODUCTION_ENV = 'production';

const mode = process.env.NODE_ENV || DEVELOPMENT_ENV;

const appBuild = path.resolve(__dirname, 'build');
const appSrc = path.resolve(__dirname, 'src');
const appIndex = path.resolve(__dirname, 'src', 'index.jsx');
const appHtml = path.resolve(__dirname, 'public', 'index.html');

module.exports = {
  mode,
  devtool: 'cheap-eval-source-map',
  entry: appIndex,
  output: {
    path: appBuild,
    filename: mode === PRODUCTION_ENV
      ? 'static/js/[name].[contenthash:8].js'
      : mode === DEVELOPMENT_ENV && 'static/js/bundle.js',
    publicPath: mode === PRODUCTION_ENV ? '/Recoil_ToDo/' : mode === DEVELOPMENT_ENV && '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        include: appSrc,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true,
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appHtml,
      templateParameters: {
        env: mode === DEVELOPMENT_ENV ? '(개발용)' : '',
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
