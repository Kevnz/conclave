const Path = require('path')
const { ApolloServer } = require('apollo-server-hapi')
const Hapi = require('hapi')
const Manifest = require('./manifest')
const Types = require('./graphql/types')
const Resolvers = require('./graphql/resolvers')

const start = async () => {
  const server = new ApolloServer({
    typeDefs: Types,
    resolvers: Resolvers,
    context: request => {
      return { ...request }
    },
  })
  const app = Hapi.server({
    port: process.env.PORT,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public'),
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['x-media-server', 'content-type'],
      },
    },
  })
  await app.register(Manifest)
  app.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './views',
    layout: true,
    layoutPath: './views',
    helpersPath: ['./views/helpers'],
    partialsPath: ['./views/partials'],
  })
  await server.applyMiddleware({
    app,
  })

  await server.installSubscriptionHandlers(app.listener)

  return app
}

module.exports = start
