const webpack = require('webpack');

const path = require('path');
const childProcess = require('child_process');

const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const mode = process.env.NODE_ENV || DEVELOPMENT;

const appBuild = path.resolve(__dirname, 'build');
const appSrc = path.resolve(__dirname, 'src');
const appIndex = path.resolve(__dirname, 'src', 'index.jsx');
const appHtml = path.resolve(__dirname, 'public', 'index.html');
const favicon = path.resolve(__dirname, 'public', 'favicon.ico');

module.exports = {
  mode,
  devtool: 'cheap-eval-source-map',
  entry: appIndex,
  output: {
    path: appBuild,
    filename: mode === PRODUCTION
      ? 'static/js/[name].[contenthash:8].js'
      : mode === DEVELOPMENT && 'static/js/bundle.js',
    publicPath: mode === PRODUCTION ? '/Recoil_ToDo/' : mode === DEVELOPMENT && '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          mode === PRODUCTION
            ? MiniCssExtractPlugin.loader
            : 'style-loader', 'css-loader',
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
  externals: {
    axios: 'axios',
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
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
        Author-Email: ${childProcess.execSync('git config user.email')}
      `,
    }),
    new HtmlWebpackPlugin({
      template: appHtml,
      templateParameters: {
        env: mode === DEVELOPMENT ? '(개발용)' : '',
      },
      minify: mode === PRODUCTION ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
      favicon,
    }),
    new CleanWebpackPlugin(),
    ...(mode === PRODUCTION
      ? [new MiniCssExtractPlugin({ filename: 'static/css/[name].[contenthash:8].css' })]
      : []),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/axios/dist/axios.min.js',
          to: './static/js/axios.min.js',
        },
        {
          from: './public/assets',
          to: './assets',
        },
      ],

    }),
  ],
  optimization: {
    minimizer: mode === PRODUCTION ? [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ] : [],
  },
};
