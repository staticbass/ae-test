const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  entry: ['whatwg-fetch', './client/app.js'],
  watch: !isProd,
  output: {
    path: path.resolve('public'),
    filename: 'app.js'
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'client']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}

if (isProd) {
  config.plugins.push(
    new UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    })
  )
}

module.exports = config
