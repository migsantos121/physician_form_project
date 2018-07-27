const webpack = require("webpack");
const path = require("path");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = webpackMerge(commonConfig, {
  entry: {
    bundle: "./src/index.tsx"
  },
  devtool: "",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/[name].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename: 'static/vendor.js', 
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'templates/index.html',
      excludeChunks: ['bundle', 'vendor']
    }),
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
});

module.exports = config;