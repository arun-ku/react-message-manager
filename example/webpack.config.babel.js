import path from 'path';

module.exports = {
  entry: './example/src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js',
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    alias: {
      'message-manager': path.resolve(__dirname, '../dist/bundle.js'),
    }
  }
};