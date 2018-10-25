const User = require('../models/user')

module.exports = function(req, res, next) {
  console.log('user details middleware')
  new User({ id: req.user.id })
    .fetch()
    .then(user => {
      console.log('user', user.toJSON())
      res.locals.user = user.toJSON()
      next()
    })
    .catch(err => {
      console.log('err', err)
      next(err)
    })
}
