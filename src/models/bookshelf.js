/* eslint new-cap: 0 */

const Bookshelf = require('bookshelf')
const knex = require('../knex')

const bookshelf = Bookshelf(knex)
bookshelf.plugin('registry')
bookshelf.plugin('virtuals')
bookshelf.plugin('visibility')
bookshelf.plugin('bookshelf-camelcase')
bookshelf.knex.on('query', data => {})

module.exports = bookshelf
