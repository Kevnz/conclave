const inflect = require('pluralize')

module.exports = word => word === inflect(word)
