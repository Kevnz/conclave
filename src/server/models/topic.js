const bookshelf = require('../bookshelf')

require('./user')
require('./message')

module.exports = bookshelf.model(
  'Topic',
  {
    tableName: 'topics',
    idAttribute: 'id',
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
    getByParentId: async function getTopics(parentId) {
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
    getTopLevel: async function getTopics() {
      return this.collection()
        .query(qb => {
          qb.whereNull('parent_id')
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
