/* eslint new-cap: 0 */
const express = require('express');
const jwt = require('jsonwebtoken');
const conditional = require('express-conditional-middleware');
const config = require('xtconf')();
const User = require('../models/user');
const MainTopics = require('../middleware/main-topics');
const UserDetails = require('../middleware/user-details');
const isAuth = require('../middleware/is-authed');
const router = express.Router();
const React = require('react');
const ReactDOM = require('react-dom/server');
const App = require('../ui/index').default;

module.exports = function homeController(passport) {
  router.get('/', MainTopics, isAuth(UserDetails), (req, res) => {
    const state = {
      topics:res.locals.topics
    };
    const exposedState = `window.__APP_STATE__=${JSON.stringify(state)};`;
    console.log('App', App);
    const markup = ReactDOM.renderToString(App({ topics: state.topics }));
    res.render('home/index', { title: 'Conclave', topics: res.locals.topics, html: markup, state: exposedState });
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
        res.cookie('tkn', token, { expires: new Date(Date.now() + (24 * 60 * 1000)) });
        res.redirect('/');
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

  router.get('/account', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render('home/account', { title: 'Conclave' });
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
