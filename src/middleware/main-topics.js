const Topic = require('../models/topic');

module.exports = function(req, res, next) {
  console.log('main topics middleware');
  Topic
    .getTopLevel(true)
    .then((topics) => {
      console.log('topics', topics.toJSON());
      res.locals.topics = topics.toJSON();
      next();
    })
    .catch((err) => {
      console.log('err', err);
      next(err);
    });
};
