const faker = require('faker')

module.exports = (id, topic = 1, createdBy = 1, parent = null) => ({
  id: id,
  title: faker.company.catchPhrase(),
  body: faker.lorem.words(40),
  created_by: createdBy,
  topic_id: topic,
  parent_id: parent,
})
