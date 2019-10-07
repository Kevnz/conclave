const faker = require('faker')

const random = (min, max) => Math.round(Math.random() * (max - min) + min)

const Tags = [
  'JavaScript',
  'CSS',
  'HTML',
  'Dashboard',
  'Web',
  'Server',
  'Performance',
]

const getTags = () => {
  const tags = []
  const total = random(0, Tags.length)
  for (let index = 0; index < total; index++) {
    tags.push(Tags[index])
  }
  return tags
}

module.exports = (id, topic = 1, createdBy = 1, parent = null) => ({
  id: id,
  title: faker.company.catchPhrase(),
  body: faker.lorem.words(40),
  created_by: createdBy,
  topic_id: topic,
  parent_id: parent,
  tags: getTags(),
})
