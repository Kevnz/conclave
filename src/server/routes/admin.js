/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-unused-vars */
const fs = require('fs').promises
const Joi = require('@hapi/joi')
const isPlural = require('../utils/is-plural')
const getModel = async request => {
  return require(`../models/`)
}

const getModels = async request => {
  return require(`../models/`)
}

module.exports = [
  {
    method: 'GET',
    path: '/admin/data',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section models. [Root Scope]',
      notes: 'Admin section model listing page.',

      validate: {},
    },
    handler: async request => {
      const files = await fs.readdir('src/server/models')

      return {
        data: files.reduce((files, current) => {
          if (current !== '__tests__' && current !== 'index.js') {
            files.push(current.replace('.js', ''))
          }
          return files
        }, []),
      }
    },
  },
  {
    method: 'GET',
    path: '/admin/data/{model}',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section model page. [Root Scope]',
      notes: 'Admin section model page.',

      validate: {},
      pre: [
        {
          assign: 'model',
          method: getModel,
        },
      ],
    },
    handler: async request => {
      const Model = require(`../models/`)[request.params.model]
      console.info('Model', Model)
      const query = {}
      const limit = request.query.limit
      const page = request.query.page

      const options = {}

      const dataItems = await Model.fetchAll()
      const inst = new Model()
      console.info('keys', inst)
      for (const i in inst) {
        console.warn('prop', i)
        console.warn('val', inst[i])
      }
      return {
        keys: inst.keys(),
        keydogs: dataItems.models[0].keys(),
        name: Model.name.toString(),
        data: dataItems,
      }
    },
  },
  {
    method: 'POST',
    path: '/admin/data/{model}',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',
      validate: {},
      pre: [],
    },
    handler: async (request, h) => {
      console.log('the post')
      const app = request.APPS_SETTINGS.filter(
        app => app.APP_ID === request.params.appName
      )[0]
      const model = app.MODELS.filter(model => {
        const m = require(model)
        return m.collectionName === request.params.model
      })[0]

      const Model = require(model)
      const document = new Model(request.payload)
      console.log('model', document)
      const doc = await Model.insertOne(document)
      console.log('doc', doc)
      return h.flash(
        `${Model.name} created`,
        `/admin/data/${request.params.appName}/${request.params.model}`
      )
    },
  },
  {
    method: 'GET',
    path: '/admin/data/{model}/{id}',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',

      validate: {},
      pre: [],
    },
    handler: async request => {
      const app = request.APPS_SETTINGS.filter(
        app => app.APP_ID === request.params.appName
      )[0]
      const model = app.MODELS.filter(model => {
        const m = require(model)
        return m.collectionName === request.params.model
      })[0]

      const Model = require(model)
      const item = await Model.findById(request.params.id)

      return {
        name: Model.name.toString(),
        [Model.name]: item,
      }
    },
  },
  {
    method: 'GET',
    path: '/admin/view',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',

      validate: {},
      pre: [
        {
          assign: 'models',
          method: getModels,
        },
      ],
    },
    handler: async (request, h) => {
      const options = {}

      const keys = Object.keys(request.pre.models)

      const singular = keys.reduce((names, name) => {
        if (isPlural(name)) return names
        if (!names.includes(name.toLowerCase())) {
          names.push(name.toLowerCase())
        }
        return names
      }, [])
      // console.log('get the models', request.pre.models)
      const data = {
        appName: 'conclave',
        models: singular,
      }

      return h.view('models.html', {
        message: 'Learning stuff',
        title: 'Conclave',
        subtitle: 'Admin Landing',
        messages: ['h.flash()'],
        data,
      })
    },
  },
  {
    method: 'GET',
    path: '/admin/view/{model}',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',

      validate: {},
      pre: [
        {
          assign: 'model',
          method: getModel,
        },
      ],
    },
    handler: async (request, h) => {
      console.log('get the model')
      const Model = require(`../models/`)[request.params.model]
      console.info('Model', Model)

      const description = Joi.describe({
        ...Model.schema.required,
        ...Model.schema.optional,
        ...Model.schema.base,
      })
      console.log('model description', description.children)
      const keys = Object.keys(description.children)

      const query = {}
      const limit = request.query.limit
      const page = request.query.page

      const options = {}

      const dataItems = await Model.fetchAll()
      const inst = new Model()
      console.info('keys', inst)
      for (const i in inst) {
        console.warn('prop', i)
        console.warn('val', inst[i])
      }

      const data = {
        appName: 'conclave',
        name: request.params.model,
        modelName: request.params.model,
        records: dataItems.toJSON(),
        attrs: dataItems.models[0].keys(),
        description: description.children,
      }

      console.log('data', data)
      return h.view('list.html', {
        message: 'Learning stuff',
        title: 'Conclave - Admin',
        subtitle: `View - ${request.params.model}`,
        messages: ['h.flash()'],
        data,
      })
    },
  },

  {
    method: 'GET',
    path: '/admin/view/{model}/new',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',
      validate: {},
      pre: [
        {
          assign: 'model',
          method: getModel,
        },
      ],
    },
    handler: async (request, h) => {
      console.log('get the model')
      const Model = require(`../models/`)[request.params.model]

      const description = Joi.describe({
        ...Model.schema.required,
        ...Model.schema.optional,
        ...Model.schema.base,
      })
      console.log('model description', description.children)
      const keys = Object.keys(description.children)
      console.log('keys', keys)
      const data = {
        appName: 'conclave',
        name: request.params.model,
        modelName: request.params.model,
        attrs: keys,
        description: description.children,
      }
      console.log('data', data)
      return h.view('new.html', {
        message: 'Making things',
        title: 'Conclave - Admin',
        subtitle: `New - ${request.params.model}`,
        modelName: request.params.model,
        data,
      })
    },
  },

  {
    method: 'POST',
    path: '/admin/view/{model}/new',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',
      validate: {},
      pre: [],
    },
    handler: async (request, h) => {
      console.log('the post', request.payload)
      const app = request.APPS_SETTINGS.filter(
        app => app.APP_ID === request.params.appName
      )[0]
      const model = app.MODELS.filter(model => {
        const m = require(model)
        return m.collectionName === request.params.model
      })[0]
      try {
        const Model = require(model)
        const document = new Model(request.payload)
        console.log('model', document)
        const [doc] = await Model.insertOne(document)
        request.logger('Doc saved', doc)
        if (doc.linkUser) {
          console.log('link user')
          request.logger('User', request.auth.credentials.user)
          await doc.linkUser(request.auth.credentials.user._id.toString())
        }
        const items = await Model.find({})
        console.log('items', items)

        return h.flash(
          `${Model.name} created`,
          `/admin/view/${request.params.appName}/${request.params.model}`
        )
      } catch (err) {
        console.log('ERROR FAILED', err)
        return h.flash(
          `${request.params.model} failed`,
          `/admin/view/${request.params.appName}/${request.params.model}`
        )
      }
    },
  },
  {
    method: 'GET',
    path: '/admin/view/{model}/{id}',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',
      validate: {},
      pre: [
        {
          assign: 'model',
          method: getModel,
        },
      ],
    },
    handler: async (request, h) => {
      const Model = require(`../models/`)[request.params.model]
      const model = await Model.getById(request.params.id)
      console.log('model', model)
      const description = Joi.describe({
        ...Model.schema.required,
        ...Model.schema.optional,
        ...Model.schema.base,
      })

      const keys = Object.keys(description.children)

      const data = {
        name: request.params.model,
        modelName: request.params.model,
        attrs: keys,
        description: description.children,
        item: model.toJSON(),
      }
      console.log('data', data)
      return h.view('edit.html', {
        message: 'Making things',
        title: 'Conclave - Admin',
        subtitle: `Edit - ${request.params.model}`,
        modelName: request.params.model,
        data,
      })
    },
  },
  {
    method: 'PUT',
    path: '/admin/view/{model}/{id}',
    options: {
      tags: ['api', 'admin'],
      description: 'Admin section main page. [Root Scope]',
      notes: 'Admin section main page.',
      validate: {},
      pre: [
        {
          assign: 'model',
          method: getModel,
        },
      ],
    },
    handler: async (request, h) => {
      const app = request.APPS_SETTINGS.filter(
        app => app.APP_ID === request.params.appName
      )[0]
      const model = app.MODELS.filter(model => {
        const m = require(model)
        return m.collectionName === request.params.model
      })[0]
      try {
        const updateModel = {
          $set: request.payload,
        }
        const Model = require(model)
        await Model.findByIdAndUpdate(request.params.id, updateModel)

        return h.flash(
          `${Model.name} updated`,
          `/admin/view/${request.params.appName}/${request.params.model}`
        )
      } catch (err) {
        console.error('ERROR FAILED', err)
        return h.flash(
          `${request.params.model} failed`,
          `/admin/view/${request.params.appName}/${request.params.model}`
        )
      }
    },
  },
]
