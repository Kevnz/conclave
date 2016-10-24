/* eslint new-cap: 0 */
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const config = require('xtconf')();
module.exports = function homeController() {
  router.get('/', (req, res) => {
    res.render('home/index', { title: 'Conclave' });
  });
  router.get('/login', (req, res) => {
    res.render('home/login', { title: 'Conclave' });
  });
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('req body', req.body);
    User
      .login(email, password)
      .then((user) => {
        const payload = { id: user.id };
        const token = jwt.sign(payload, config.get('auth-secret'));
        //res.json({ message: 'ok', token });
        res.redirect('/?token=' + token);
      })
      .catch((err) => {
        console.log('err', err);
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
