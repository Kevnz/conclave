// process.env.DEBUG = '*'
require('xtconf')()

module.exports = {
  verbose: true,
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testPathPattern: '(src).*(__tests__).*.test.js',
}
