const webpack = require('webpack')

const baseConfig = require('../src/webpack/config')

const devConfig = {
  plugins: [

  ],
}

module.exports = {
  ...baseConfig,
  ...devConfig,
}

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // add your custom rules.
    ],
  },
};
