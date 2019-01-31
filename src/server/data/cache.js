var Redis = require('ioredis')
var redis = new Redis()

const proxyMethodMissing = function(object, missingMethod) {
  const proxyObject = new Proxy(object, {
    get(object, property) {
      if (Reflect.has(object, property)) {
        return Reflect.get(object, property)
      } else {
        return (...args) =>
          Reflect.apply(missingMethod, proxyObject, [property, ...args])
      }
    },
  })
  return proxyObject
}

class Cache {
  constructor(prepend) {
    this.prepend = prepend || 'redis-cache'
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.has = this.has.bind(this)
    this.hasAll = this.hasAll.bind(this)
  }

  async get(key) {
    console.log('get', key)
    const getted = await redis.get(`${this.prepend}-${key}`)
    console.log('getted', getted)
    console.log('the key of that', `${this.prepend}-${key}`)
    if (getted === null) {
      console.log('return false')
      return Promise.resolve(false)
    }
    return Promise.resolve(JSON.parse(getted))
  }

  async has(key) {
    console.log('has called', key)
    console.log('this', this)
    const hasr = await redis.exists(`${this.prepend}-${key}`)
    console.log('has', hasr)
    return hasr !== 0
  }

  delete(key) {
    return redis.del(`${this.prepend}-${key}`)
  }

  set(key, data) {
    console.log('set on this key', key)
    console.log('set this data', data)
    return redis.set(`${this.prepend}-${key}`, JSON.stringify(data))
  }

  async clear() {
    return redis.flushAll()
  }

  async hasAll(keys) {
    const mapped = keys.map(this.has)
    console.log('mapped', mapped)
    const all = await Promise.all(mapped)
    console.log('all awaited ', all)
    return !all.some(inCache => inCache === false)
  }
}

const FullCache = proxyMethodMissing(Cache, (method, ...args) =>
  console.log(`Sorry - no function ${method}(${args.join(' ')})`)
)
module.exports = FullCache
