module.exports = [
  {
    plugin: require('blipp'),
  },
  {
    plugin: require('vision'),
  },
  {
    plugin: require('inert'),
  },
  {
    plugin: require('@hapi/yar'),
    options: {
      storeBlank: false,
      cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long', // config passed in?
        isSecure: false,
      },
    },
  },
  {
    plugin: require('good'),
    options: {
      ops: {
        interval: 30 * 200,
      },
      reporters: {
        console: [
          {
            module: 'good-console',
            args: [{ log: '*', response: '*' }],
          },
          'stdout',
        ],
      },
    },
  },
  {
    plugin: require('hapi-router'),
    options: {
      routes: ['src/server/routes/**/*.js'],
    },
  },
  {
    plugin: require('./plugins/flash'),
    options: {
      storeBlank: false,
      cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long', // config passed in?
        isSecure: false,
      },
    },
  },
]
