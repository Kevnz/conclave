module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}
