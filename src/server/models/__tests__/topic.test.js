const topicFixtures = require('../../../fixtures/topics-fixture.json')
const Topic = require('../topic')
console.log('topicFixtures', topicFixtures)
describe('The Topic Model', () => {
  describe('Top Level', () => {
    it('should return the lop level (null parent_id) topics ', () => {
      return Topic.collection()
        .query(qb => {
          qb.whereNull('parent_id')
        })
        .fetch()
        .then(topics => {
          const serializedTopics = topics.map(topic => topic.toJSON())
          const fixtureCount = topicFixtures.filter(
            topic => topic.parent_id === null
          ).length
          console.log('serializedTopics', serializedTopics)
          expect(serializedTopics.length === fixtureCount)
        })
    })
    it('should return the lop level (null parent_id) topics when getByParentId is called', () => {
      return Topic.getByParentId().then(topics => {
        const serializedTopics = topics.map(topic => topic.toJSON())
        const fixtureCount = topicFixtures.filter(
          topic => topic.parent_id === null
        ).length
        expect(serializedTopics.length === fixtureCount)
      })
    })
    it('should return children and created when fetched', () => {
      return Topic.where({ id: 1 })
        .fetch({
          withRelated: ['childTopics', 'creator'],
        })
        .then(topic => {
          const childrenCount = topic.toJSON().childTopics.length
          const creator = topic.toJSON().creator
          const fixtureChildrenCount = topicFixtures.filter(
            top => top.parent_id === 1
          ).length
          expect(childrenCount === fixtureChildrenCount)
          expect(creator.id === 1)
        })
    })
  })
})
