const bookshelf = require('../bookshelf')

module.exports = bookshelf.model(
  'Message',
  {
    tableName: 'messages',
    idAttribute: 'id',
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
  }
)
