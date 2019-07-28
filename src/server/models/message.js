const bookshelf = require('../bookshelf')

module.exports = bookshelf.model(
  'Message',
  {
    tableName: 'messages',
    idAttribute: 'id',
    virtuals: {
      createdOn: function() {
        return this.get('created_at')
      },
    },
    createdBy: function() {
      return this.belongsTo('User', 'created_by')
    },
    topic: function() {
      return this.belongsTo('Topic', 'topic_id')
    },
    replies: function() {
      return this.hasMany('Message', 'parent_id')
    },
  },
  {
    getById: async function(id) {
      const message = new this({ id })
      await message.fetch()
      return message
    },
    getByTopic: async function getByTopic(topicId) {
      return this.collection()
        .query(qb => {
          if (topicId) {
            qb.where('topic_id', topicId)
          } else {
            qb.whereNull('topic_id')
          }
        })
        .fetch()
    },
    getReplies: async function getReplies(parentId) {
      return this.collection()
        .query(qb => {
          qb.where('parent_id', parentId)
        })
        .fetch()
    },
    getRecent: async function getReplies(parentId) {
      return this.collection()
        .query(qb => {
          qb.whereNotNull('topic_id').orderBy('created_at')
        })
        .fetch()
    },
  }
)
