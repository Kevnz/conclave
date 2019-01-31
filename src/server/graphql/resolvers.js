const { User, Topic, Topics, Message } = require('../models')
const { getUserIdFromContext, getToken } = require('../utils/auth')
const loader = require('../data/loader')
const RedisCache = require('../data/cache')
const Map = require('../utils/async/map')
const cache = new RedisCache('topics')

const getUser = async (root, args, context, info) => {
  const user = await User.getById(root.created_by)
  return user.toJSON()
}

const childTopicLoadFunction = async keys => {
  // this is where the cache check should happen
  const hasKeys = await cache.hasAll(keys)
  console.log('has those keys?', hasKeys)
  if (hasKeys) {
    console.log('return from cache')
    return Promise.all(keys.map(cache.get))
  }
  const tops = await Topics.query(qb => {
    qb.where('parent_id', 'in', keys)
  }).fetch()
  const topics = tops.toJSON()
  return Map(keys, async key => {
    const tops = topics.filter(t => t.parent_id === key) || []
    await cache.set(key, tops)
    console.log('set?')
    return tops
  })
}

const ChildTopicLoader = () => {
  return loader(childTopicLoadFunction)
}
const childTopicLoader = ChildTopicLoader()

const resolvers = {
  Query: {
    topics: async (root, args, context, info) => {
      const tops = await Topic.getByParentId(args.topicId)
      return tops.toJSON()
    },
    user: async (root, args, context, info) => {
      const user = await new User({ id: getUserIdFromContext(context) }).fetch()
      return user.toJSON()
    },
  },
  Message: {
    createdBy: getUser,
    replies: async (root, args, context, info) => {
      const messages = await Message.getReplies(root.id)
      return messages.toJSON()
    },
  },
  Topic: {
    createdBy: getUser,
    childTopics: async (root, args, context, info) => {
      return childTopicLoader.load(root.id)
    },
    messages: async (root, args, context, info) => {
      const messages = await Message.getByTopic(root.id)
      return messages.toJSON()
    },
  },
  Mutation: {
    login: async (root, args, context, info) => {
      const user = await User.login(
        args.loginInput.email,
        args.loginInput.password
      )
      return {
        token: getToken(user.id),
        user: user.toJSON(),
      }
    },
    signup: async (root, args, context, info) => {
      const user = await User.register(args.newUserInput)
      return {
        token: getToken(user.id),
        user: user.toJSON(),
      }
    },
  },
}

module.exports = resolvers
