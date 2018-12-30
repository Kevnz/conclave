const faker = require('faker')

module.exports = (id, createdBy = 1) => ({
  id: id,
  title: faker.company.catchPhrase(),
  description: faker.company.bs(),
  created_by: createdBy,
})
