/* eslint new-cap: 0 */
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('xtconf')();
const User = require('../models/user');
const MainTopics = require('../middleware/main-topics');
const router = express.Router();

module.exports = function homeController() {
  router.get('/', MainTopics, (req, res) => {
    console.log('render ender', res.locals.topics);
    res.render('home/index', { title: 'Conclave', topics: res.locals.topics });
  });
  router.get('/login', (req, res) => {
    res.render('home/login', { title: 'Conclave' });
  });
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User
      .login(email, password)
      .then((user) => {
        if (user === null) {
          req.flash('danger', 'There was a problem, please check your details and try again.');
          res.redirect('/login');
          return null;
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, config.get('auth-secret'));
        res.redirect('/?token=' + token);
        return null;
      })
      .catch((err) => {
        req.flash('danger', 'There was a problem, please check your details and try again.');
        res.redirect('/login');
      });
  });
  router.get('/register', (req, res) => {
    res.render('home/register', { title: 'Conclave' });
  });
  router.post('/register', (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    User
    .register(firstName, lastName, email, password)
    .then((user) => {
      res.redirect('/login');
    })
    .catch(err => next(err));
  });
  return router;
};
