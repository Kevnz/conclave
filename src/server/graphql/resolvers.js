const { User } = require('../models')
const resolvers = {
  Query: {
    user: async (root, args, context, info) => {
      const user = await User.fetch()
      return user.toJSON()
    },
    login: async (root, args, context, info) => {
      const user = await User.fetch()
      return user.toJSON()
    },
  },
  Mutations: {
    signup: async (root, args, context, info) => {
      const user = new User(args)
      await user.save()
      return user.toJSON()
    },
  },
}

module.exports = resolvers
