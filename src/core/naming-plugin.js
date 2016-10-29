const to = require('to-case');

module.exports = function namingConvention(bookshelf) {
  const proto = bookshelf.Model.prototype;
  bookshelf.Model = bookshelf.Model.extend({
    set: (key, value, options) => {
      const transformedKey = to.snake(key);
      if (key == null) return this;
      return proto.set.call(this, transformedKey, value, options);
    },
    get: (key) => {
      const transformedKey = to.snake(key);
      return proto.get.call(this, transformedKey);
    }
  });
};
