const merge = require('merge-deep')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//  .BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./config')

const devConfig = {
  entry: './src/ui/index.js',
  plugins: [
    /*
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    */
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: '"development"',
        },
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Conclave',
      template: './src/ui/index.html',
      historyApiFallback: true,
    }),
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 8090,
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:4567/',
    },
  },
}

module.exports = merge(baseConfig, devConfig)
