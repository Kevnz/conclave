/* eslint new-cap: 0 */
const express = require('express')
const User = require('../../models/user')

const router = express.Router()

module.exports = function homeController() {
  router.get('/:userId', (req, res, next) => {
    User.where({ id: req.parems.userId })
      .then(user => {
        res.send(user.toJSON())
      })
      .catch(err => {
        next(err)
      })
  })
  return router
}
