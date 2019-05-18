const merge = require('merge-deep')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//  .BundleAnalyzerPlugin
const baseConfig = require('./config')

const devConfig = {
  entry: './src/ui/index.js',
  plugins: [
    /*
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    */
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/ui/index.html',
      historyApiFallback: true,
    }),
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:4567/',
    },
  },
}

module.exports = merge(baseConfig, devConfig)
