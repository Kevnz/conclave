const merge = require('../utils/merge')

// Declare internals
const defaults = {
  sessionId: 'sid',
  segment: 'flash',
  expires: 5 * 60 * 1000, // 5 minutes
  cache: {},
}

const pluginName = 'conclave-flash'

const register = (server, options) => {
  const settings = merge(defaults, options)
  settings.cache = server.cache({
    segment: settings.segment,
    expiresIn: settings.expires,
  })

  const flash = function(message, destination) {
    let reply = this
    let request = reply.request

    let store = request.yar.get(pluginName)

    if (message) {
      if (store && store.messages) {
        if (Array.isArray(message)) {
          store.messages.push.apply(store.messages, message)
        } else {
          store.messages.push(message)
        }
        request.yar.set(pluginName, store)
        if (destination) {
          return reply.redirect(destination)
        }
      } else {
        request.yar.set(pluginName, {
          messages: [message],
        })
        if (destination) {
          return reply.redirect(destination)
        }
      }
    } else {
      if (store && store.messages) {
        let messages = store.messages.concat([])
        store.messages = []
        request.yar.set(pluginName, store)
        return messages
      } else {
        return []
      }
    }
    return reply.continue
  }

  server.decorate('toolkit', 'flash', flash)

  server.ext('onPostAuth', function(request, h) {
    return h.continue
  })
}
// Store any messages in the cache

module.exports = {
  name: pluginName,
  version: '1.0.0',
  register,
}
