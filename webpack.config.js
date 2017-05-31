const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: path.join(__dirname, 'src/App.jsx'),
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
},
{
  entry: path.join(__dirname, 'src/stylesheets/index.sass'),
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'index.css'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
    }]
  },
  plugins: [
    new ExtractTextPlugin('index.css')
  ]
}
]
