module.exports = function isAuthenticatedMiddleware(middleware) {
  return (req, res, next) => {
    if (req.user) {
      middleware(req, res, next)
    } else {
      next()
    }
  }
}
