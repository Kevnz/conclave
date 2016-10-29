const Promise = require('bluebird');
const bookshelf = require('./bookshelf');
require('./user');
require('./message');

module.exports = bookshelf.model('Topic', {
  tableName: 'topics',
  idAttribute: 'id',
  creator: function () {
    return this.belongsTo('User', 'created_by');
  },
  children: function() {
    return this.hasMany('Topic', 'parent_id');
  },
  messages: function() {
    return this.hasMany('Message', 'topic_id');
  }
}, {
  getByParentId: Promise.method(function getTopics(parentId) {
    return this.collection().query((qb) => {
      if (parentId) {
        qb.where('parent_id', parentId);
      } else {
        qb.whereNull('parent_id');
      }
    })
    .fetch();
  }),
  getTopLevel: Promise.method(function getTopics() {
    return this.collection().query((qb) => {
      qb.whereNull('parent_id');
    })
    .fetch();
  })
});
