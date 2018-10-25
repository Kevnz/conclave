process.env.DEBUG = '*'
require('./utils/logger')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const layouts = require('express-ejs-layouts')
const home = require('./controllers/home')
const requiredir = require('requiredir')
const passport = require('passport')
const strategy = require('./core/jwt-strategy')
const graphqlHTTP = require('express-graphql')
const ConclaveSchema = require('./schema')
const session = require('express-session')
const config = require('xtconf')()
const flash = require('flash')
const userSession = require('./middleware/user-session')

const api = requiredir('./controllers/api/')
const listEndpoints = require('express-list-endpoints')

const app = express()

app.use(session(config.get('session')))
app.use(flash())
passport.use(strategy)
app.use(passport.initialize())

app.set('views', path.join(__dirname, '../', 'views'))
app.set('view engine', 'ejs')
app.use(layouts)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(favicon(path.join(__dirname, '../', '/public/favicons/favicon.ico')))
app.use(userSession)
app.use(
  '/graphql',
  graphqlHTTP({
    schema: ConclaveSchema,
    graphiql: true,
    pretty: true,
  })
)

app.use(home(passport))
app.use('/api/topics', api.topics())
app.use('/api/users', api.users())

app.use(function notFoundHandler(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function devErrorHander(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
      username: 'Error',
      title: 'There was a problem',
      pageDescription: 'bad things happened',
      url: req.originalUrl,
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function prodErrorHander(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {},
    username: 'Error',
    title: 'There was a problem',
    pageDescription: 'Unfortunately there was a problem with that request.',
    url: req.originalUrl,
  })
})

console.log('end points', listEndpoints(app))
module.exports = app
