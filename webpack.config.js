const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client/app');

const config = {
  entry: {
    'home': APP_DIR + '/index.jsx',
    'owner': APP_DIR + '/owner/index.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
       }
      }
    ]
  }
};

module.exports = config;
