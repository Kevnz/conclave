const Joi = require('@hapi/joi')
const bookshelf = require('../bookshelf')
require('./user')
require('./message')

const schema = {
  required: {
    title: Joi.string().required(),
    description: Joi.string().required(),
  },
  optional: {
    parent_id: Joi.number().optional(),
    created_by: Joi.number().optional(),
  },
  base: {
    id: Joi.any().optional(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
  },
}

module.exports = bookshelf.model(
  'Topic',
  {
    tableName: 'topics',
    idAttribute: 'id',
    virtuals: {
      createdOn: function() {
        return this.get('created_at')
      },
    },
    createdBy: function() {
      return this.belongsTo('User', 'created_by')
    },
    childTopics: function() {
      return this.hasMany('Topic', 'parent_id')
    },
    messages: function() {
      return this.hasMany('Message', 'topic_id')
    },
  },
  {
    schema,
    getById: async function(id) {
      const topic = new this({ id })
      await topic.fetch()
      return topic
    },
    getByParentId: async function(parentId) {
      return this.collection()
        .query(qb => {
          if (parentId) {
            qb.where('parent_id', parentId)
          } else {
            qb.whereNull('parent_id')
          }
        })
        .fetch({
          /*
          withRelated: [
            'childTopics',
            'createdBy',
            'messages',
            'childTopics.createdBy',
            'childTopics.childTopics',
            'childTopics.childTopics.createdBy',
            'childTopics.childTopics.messages',
            'childTopics.childTopics.messages.createdBy',
            'messages.createdBy',
          ],
          */
        })
    },
    getTopLevel: async function() {
      return this.collection()
        .query(qb => {
          qb.whereNull('parent_id')
        })
        .fetch({
          withRelated: ['childTopics', 'createdBy'],
        })
    },
    popularTopics: async function() {
      return this.collection()
        .query(qb => {
          qb.orderBy('created_at').limit(15)
        })
        .fetch({
          withRelated: ['childTopics', 'createdBy'],
        })
    },
    // eslint-disable-next-line sonarjs/no-identical-functions
    getRecent: async function() {
      return this.collection()
        .query(qb => {
          qb.orderBy('created_at', 'desc')
        })
        .fetch({
          withRelated: ['childTopics', 'createdBy'],
        })
    },
    addTopic: async function add({
      title,
      description,
      // eslint-disable-next-line camelcase
      created_by,
      // eslint-disable-next-line camelcase
      parent_id,
    }) {
      console.info('topic', {
        title,
        description,
        created_by,
        parent_id,
      })
      return new this({
        title,
        description,
        created_by,
        parent_id,
      }).save()
    },
  }
)
