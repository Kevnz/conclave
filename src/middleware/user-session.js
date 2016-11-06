const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('xtconf')();
const cookieExtractor = require('../core/cookie-extractor');

module.exports = function(req, res, next) {
  const token = cookieExtractor(req);
  if (!token) {
    req.isAuthenticated = false;
    next();
    return;
  }
  jwt.verify(token, config.get('auth-secret'), (err, decoded) => {
    new User({ id: decoded.id })
      .fetch()
      .then((user) => {
        req.user = user.toJSON();
        req.isAuthenticated = true;
        next();
        return;
      })
      .catch(() => {
        req.isAuthenticated = false;
        next();
        return;
      });
  });

};
