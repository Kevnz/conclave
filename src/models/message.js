const Promise = require('bluebird');
const bookshelf = require('./bookshelf');
require('./user');
require('./topic');

module.exports = bookshelf.model('Message', {
  tableName: 'messages',
  idAttribute: 'id',
  creator: function () {
    return this.belongsTo('User', 'created_by');
  },
  topic: function () {
    return this.belongsTo('Topic', 'topic_id');
  },
  replies: function() {
    return this.hasMany('Message', 'parent_id');
  }
}, {
  getByTopic: Promise.method(function getTopics(topicId) {
    return this.collection().query((qb) => {
      if (topicId) {
        qb.where('topic_id', topicId);
      } else {
        qb.whereNull('topic_id');
      }
    })
    .fetch();
  })
});