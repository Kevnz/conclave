const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require('graphql-iso-date')
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

const getTopic = async (root, args, context, info) => {
  const topic = await Topic.getById(root.topic_id)
  return topic.toJSON()
}
const getMessageForChild = async (root, args, context, info) => {
  const message = await Message.getById(root.parent_id)
  return message.toJSON()
}

const childTopicLoadFunction = async keys => {
  const hasKeys = await cache.hasAll(keys)
  if (hasKeys) {
    return Promise.all(keys.map(cache.get))
  }
  const tops = await Topics.query(qb => {
    qb.where('parent_id', 'in', keys)
  }).fetch()
  const topics = tops.toJSON()
  return Map(keys, async key => {
    const tops = topics.filter(t => t.parent_id === key) || []
    await cache.set(key, tops)
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
    topTopics: async (root, args, context, info) => {
      const tops = await Topic.getTopLevel()
      return tops.toJSON()
    },
    recentPosts: async (root, args, context, info) => {
      const tops = await Message.getRecent()
      return tops.toJSON()
    },
    user: async (root, args, context, info) => {
      const user = await new User({ id: getUserIdFromContext(context) }).fetch()
      return user.toJSON()
    },
  },
  Message: {
    createdBy: getUser,
    topic: getTopic,
    parent: getMessageForChild,
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
    addTopic: async (root, args, context, info) => {
      const userId = getUserIdFromContext(context)

      const topic = await Topic.addTopic({
        ...args.topicInput,
        created_by: userId,
      })
      return topic.toJSON()
    },
  },
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
}

module.exports = resolvers
