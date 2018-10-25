module.exports = function cookieExtractor(req) {
  return req && req.cookies ? req.cookies.tkn : null
}
