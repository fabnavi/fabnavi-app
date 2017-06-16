const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(require('bourbon'));
module.exports = [{
  entry: path.join(__dirname, 'src/components/FabnaviApp.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-3']
      }
    }, {
      test: /.scss$/, 
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: require('bourbon').includePaths.concat(require('bourbon-neat').includePaths)
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}]
