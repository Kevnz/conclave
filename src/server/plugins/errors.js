const errorAdpater = {}

const getRequestLevel = ({ response }) => {
  if (response && response.output && response.output.statusCode) {
    return response.output.statusCode.toString().substr(0, 1) === '5'
      ? 'error'
      : 'info'
  }
  return 'info'
}
const getRequestLevelNonBoom = ({ response }) => {
  if (response && response.statusCode) {
    return response.statusCode.toString().substr(0, 1) === '5'
      ? 'error'
      : 'info'
  }
  return 'info'
}

const getRequestData = (server, options, request, level) => {
  const requestInfo = request.info || {}
  const serverInfo = server.info || {}
  const url =
    requestInfo.uri ||
    (requestInfo.host && `${serverInfo.protocol}://${requestInfo.host}`) ||
    serverInfo.uri

  return {
    request: {
      method: request.method,
      query_string: request.query,
      headers: request.headers,
      cookies: request.state,
      url: url + request.path,
    },
    extra: {
      timestamp: requestInfo.received,
      id: request.id,
      remotePort: requestInfo.remotePort,
    },
    tags: options.tags,
    level,
  }
}

const register = (server, options) => {
  server.decorate('request', 'reportMessage', errorAdpater.message)
  server.decorate('request', 'reportError', errorAdpater.exception)
  server.ext('onPreResponse', function(request, h) {
    const level = request.response.isBoom
      ? getRequestLevel(request)
      : getRequestLevelNonBoom(request)

    const requestResponse = request.response || {}
    const sender =
      level === 'error' ? errorAdpater.exception : errorAdpater.message
    const captureDescription =
      level === 'error' ? requestResponse : requestResponse.message

    sender(captureDescription, getRequestData(server, options, request, level))
    return h.continue
  })
}

const name = 'conclave-error-reporter'
const version = '1.0.0'
const multiple = false
const dependencies = 'hapi-boom-decorators'
const once = true
const pkg = {}

module.exports = {
  register,
  name,
  version,
  multiple,
  once,
  pkg,
  dependencies,
}
