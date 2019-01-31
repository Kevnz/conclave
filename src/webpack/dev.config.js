const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const baseConfig = require('./config')

const devConfig = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/ui/index.html',
      historyApiFallback: true,
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/graphql': 'http://localhost:4567/',
    },
  },
}

module.exports = {
  ...baseConfig,
  ...devConfig,
}
