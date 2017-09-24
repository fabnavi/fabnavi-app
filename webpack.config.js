const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: path.join(__dirname, 'src/components/FabnaviApp.jsx'),
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
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
  devtool: 'source-map',
  externals: [
    function(context, request, callback){
      if(request === 'electron'){
        return callback(null, "require('" + request + "')");
      }
      return callback();
    }
  ]
}]
