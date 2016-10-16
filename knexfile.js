const dev = require('xtconf')('development');
const staging = require('xtconf')('staging');
const prod = require('xtconf')('production');
const test = require('xtconf')('test');

module.exports = {
  test: test.get('database-connection'),
  development: dev.get('database-connection'),
  staging: staging.get('database-connection'),
  production: prod.get('database-connection')
};
