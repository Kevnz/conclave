const faker = require('faker')

module.exports = (id, createdBy = 1, parent_id = null) => ({
  id: id,
  title: faker.company.catchPhrase(),
  description: faker.company.bs(),
  created_by: createdBy,
  parent_id: parent_id,
})
