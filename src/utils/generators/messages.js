const faker = require('faker')
const lorem = require('lorem-ipsum')

module.exports = function messageGen(topic = 1, createdBy = 1, parent = null) {
  return {
    title: faker.company.catchPhrase(),
    body: lorem({ count: 40, units: 'words' }),
    created_by: createdBy,
    topic_id: topic,
    parent_id: parent,
  }
}
