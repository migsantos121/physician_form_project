const webpack = require("webpack");
const pkg = require('./package.json');

const config = {
  entry: {
    vendor: [
      'reactstrap',
      'mobx',
      'commonmark'
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: [/node_modules/, /__tests__/, "*.spec.ts"]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:6]'
        }, {
          loader: 'resolve-url-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = config;