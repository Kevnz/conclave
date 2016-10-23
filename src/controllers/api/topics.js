/* eslint new-cap: 0 */
const express = require('express');
const Topic = require('../../models/topic');

const router = express.Router();

module.exports = function homeController() {
  router.get('/', (req, res, next) => {
    Topic
      .getByParentId()
      .then((topics) => {
        res.send(topics.toJSON());
      })
      .catch((err) => {
        next(err);
      });
  });

  router.get('/:topicId', (req, res, next) => {
    Topic
      .getByParentId(req.params.topicId)
      .then((topics) => {
        res.send(topics.toJSON());
      })
      .catch((err) => {
        next(err);
      });
  });

  return router;
};
