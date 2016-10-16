
const bookshelf = require('./bookshelf');
require('./user');

module.exports = bookshelf.model('Topic', {
  tableName: 'topics',
  idAttribute: 'id',
  creator: function () {
    return this.belongsTo('User', 'created_by');
  }
});
