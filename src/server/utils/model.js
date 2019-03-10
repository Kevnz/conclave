const extend = require('xtend')
const Joi = require('joi')
const difference = require('lodash.difference')

module.exports = function modelBase(bookshelf, params) {
  if (!bookshelf) {
    throw new Error('Must pass an initialized bookshelf instance')
  }

  var bookshelfModel = bookshelf.Model

  return bookshelf.Model.extend(
    {
      constructor: function() {
        bookshelfModel.apply(this, arguments)
      },

      hasTimestamps: ['created_at', 'updated_at'],
    },
    {
      /**
       * Select a collection based on a query
       * @param {Object} [query]
       * @param {Object} [options] Options used of model.fetchAll
       * @return {Promise(bookshelf.Collection)} Bookshelf Collection of Models
       */
      findAll: function(filter, options) {
        return this.forge()
          .where(extend({}, filter))
          .fetchAll(options)
      },

      /**
       * Find a model based on it's ID
       * @param {String} id The model's ID
       * @param {Object} [options] Options used of model.fetch
       * @return {Promise(bookshelf.Model)}
       */
      findById: function(id, options) {
        return this.findOne({ [this.prototype.idAttribute]: id }, options)
      },

      /**
       * Select a model based on a query
       * @param {Object} [query]
       * @param {Object} [options] Options for model.fetch
       * @param {Boolean} [options.require=false]
       * @return {Promise(bookshelf.Model)}
       */
      findOne: function(query, options) {
        options = extend({ require: true }, options)
        return this.forge(query).fetch(options)
      },

      /**
       * Insert a model based on data
       * @param {Object} data
       * @param {Object} [options] Options for model.save
       * @return {Promise(bookshelf.Model)}
       */
      create: function(data, options) {
        return this.forge(data).save(null, options)
      },

      /**
       * Update a model based on data
       * @param {Object} data
       * @param {Object} options Options for model.fetch and model.save
       * @param {String|Integer} options.id The id of the model to update
       * @param {Boolean} [options.patch=true]
       * @param {Boolean} [options.require=true]
       * @return {Promise(bookshelf.Model)}
       */
      update: function(data, options) {
        options = extend({ patch: true, require: true }, options)
        return this.forge({ [this.prototype.idAttribute]: options.id })
          .fetch(options)
          .then(function(model) {
            return model ? model.save(data, options) : undefined
          })
      },

      /**
       * Destroy a model by id
       * @param {Object} options
       * @param {String|Integer} options.id The id of the model to destroy
       * @param {Boolean} [options.require=false]
       * @return {Promise(bookshelf.Model)} empty model
       */
      destroy: function(options) {
        options = extend({ require: true }, options)
        return this.forge({ [this.prototype.idAttribute]: options.id }).destroy(
          options
        )
      },
    }
  )
}

module.exports.pluggable = function(bookshelf, params) {
  bookshelf.Model = module.exports.apply(null, arguments)
}
