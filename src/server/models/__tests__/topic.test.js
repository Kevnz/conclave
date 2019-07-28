/* eslint-disable sonarjs/no-identical-functions */
const faker = require('faker')
const topicFixtures = require('../../../fixtures/topics-fixture.json')
const Topic = require('../topic')

describe('The Topic Model', () => {
  it('should match the snapshopt', async () => {
    const topic = await Topic.where({ id: 1 }).fetch()
    const snapshotTopic = topic.toJSON()
    //  delete snapshotTopic.created_at
    //  delete snapshotTopic.updated_at
    expect(snapshotTopic).toMatchSnapshot()
  })
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
          withRelated: ['childTopics', 'createdBy'],
        })
        .then(topic => {
          const childrenCount = topic.toJSON().childTopics.length
          const createdBy = topic.toJSON().createdBy
          const fixtureChildrenCount = topicFixtures.filter(
            top => top.parent_id === 1
          ).length
          expect(childrenCount === fixtureChildrenCount)
          expect(createdBy.id === 1)
        })
    })
    it('should return the recent topics is getRecent is called', () => {
      return Topic.getRecent().then(topics => {
        const serializedTopics = topics.map(topic => topic.toJSON())
        const fixtureCount = topicFixtures.filter(
          topic => topic.parent_id === null
        ).length
        expect(serializedTopics.length === fixtureCount)
      })
    })
  })
  describe('Adding a topic', () => {
    it('should add a topic at the root level', async () => {
      const topic = await Topic.addTopic({
        title: faker.company.catchPhrase(),
        description: faker.company.bs(),
        created_by: 1,
      })
      expect(topic.toJSON()).not.toBeNull()
    })
  })
})
