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

const getModelList = models => {
  return models.reduce((names, name) => {
    if (isPlural(name)) return names
    if (!names.includes(name.toLowerCase())) {
      names.push(name.toLowerCase())
    }
    return names
  }, [])
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

      const query = {}
      const limit = request.query.limit
      const page = request.query.page

      const options = {}

      const dataItems = await Model.fetchAll()
      const inst = new Model()

      return {
        keys: inst.keys(),
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
      const Model = require(`../models/`)[request.params.model]

      const model = new Model(request.payload)
      await model.save()
      return h.flash(
        `${request.params.model} created`,
        `/admin/data/${request.params.model}`
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
      const Model = require(`../models/`)[request.params.model]
      const model = await Model.getById(request.params.id)

      return {
        name: Model.name.toString(),
        [Model.name]: model,
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
      const singular = getModelList(keys)

      const data = {
        appName: 'conclave',
        models: singular,
      }

      return h.view('models.html', {
        message: 'Learning stuff',
        title: 'Conclave',
        subtitle: 'Admin Landing',
        messages: h.flash(),
        models: singular,
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
        {
          assign: 'models',
          method: getModels,
        },
      ],
    },
    handler: async (request, h) => {
      const Model = require(`../models/`)[request.params.model]
      console.info('Model', Model)

      const description = Joi.describe({
        ...Model.schema.required,
        ...Model.schema.optional,
        ...Model.schema.base,
      })
      const keysD = Object.keys(request.pre.models)
      const singular = getModelList(keysD)
      const keys = Object.keys(description.children)

      const query = {}
      const limit = request.query.limit
      const page = request.query.page

      const options = {}

      const dataItems = await Model.fetchAll()
      const inst = new Model()

      const data = {
        appName: 'conclave',
        name: request.params.model,
        modelName: request.params.model,
        records: dataItems.toJSON(),
        attrs: dataItems.models[0].keys(),
        description: description.children,
        models: singular,
      }

      return h.view('list.html', {
        message: 'Conclave',
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
        {
          assign: 'models',
          method: getModels,
        },
      ],
    },
    handler: async (request, h) => {
      const Model = require(`../models/`)[request.params.model]

      const description = Joi.describe({
        ...Model.schema.required,
        ...Model.schema.optional,
        ...Model.schema.base,
      })

      const keys = Object.keys(description.children)
      const keysD = Object.keys(request.pre.models)
      const singular = getModelList(keysD)
      const data = {
        appName: 'conclave',
        name: request.params.model,
        modelName: request.params.model,
        attrs: keys,
        description: description.children,
        models: singular,
      }

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
      try {
        delete request.payload.id
        delete request.payload.created_at
        if (request.payload.parent_id === '') {
          delete request.payload.parent_id
        }
        const payloadKeys = Object.keys(request.payload)
        const payload = payloadKeys.reduce((vals, current) => {
          if (
            current.indexOf('_id') > -1 &&
            request.payload[current] !== null
          ) {
            vals[current] = parseInt(request.payload[current], 10)
          } else {
            vals[current] = request.payload[current]
          }
          return vals
        }, {})
        console.info('payload', request.payload)
        console.info('payload reduced', payload)

        console.info('request.params.model', request.params.model)
        const Model = require(`../models/`)[request.params.model]
        const model = new Model(payload)

        await model.save()

        return h.flash(
          `${Model.name} created`,
          `/admin/view/${request.params.model}/`
        )
      } catch (err) {
        console.log('ERROR FAILED', err)
        return h.flash(
          `${request.params.model} failed`,
          `/admin/view/${request.params.model}/new`
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
        {
          assign: 'models',
          method: getModels,
        },
      ],
    },
    handler: async (request, h) => {
      const Model = require(`../models/`)[request.params.model]
      const model = await Model.getById(request.params.id)

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
      const Model = require(`../models/`)[request.params.model]
      const model = await Model.getById(request.params.id)

      try {
        model.set(request.payload)
        await model.save()

        return h.flash(
          `${Model.name} updated`,
          `/admin/view/${request.params.model}/`
        )
      } catch (err) {
        console.error('ERROR FAILED', err)
        return h.flash(
          `${request.params.model} failed`,
          `/admin/view/${request.params.model}/`
        )
      }
    },
  },
]
