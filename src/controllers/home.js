/* eslint new-cap: 0 */
const express = require('express');

const router = express.Router();

module.exports = function homeController() {
  router.get('/', (req, res) => {
    res.render('home/index', { title: 'Conclave' });
  });
  return router;
};
