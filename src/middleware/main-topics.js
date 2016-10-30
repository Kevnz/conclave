const Topic = require('../models/topic');

module.exports = function(req, res, next) {
  Topic
    .getByParentId()
    .then((topics) => {
      res.locals.topics = topics.toJSON();
      next();
    })
    .catch((err) => {
      next(err);
    });
};
