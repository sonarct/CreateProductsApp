const webpack = require('webpack')

module.exports = options => {
  return {
    entry: './index.js',
    output: {
      filename: './build/bundle.js'
    },
    // devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader',
            options: {
              modules: true
            }
          },
          { loader: 'css-loader' }]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.ProvidePlugin({
        Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
        fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      })
    ],
    devServer: {
      inline: true
    }
  }
}
