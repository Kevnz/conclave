/* eslint-env node, mocha */

const assert = require('assert');
const topicFixtures = require('../../../fixtures/topics-fixture.json').topics;
const Topic = require('../topic');

describe('The Topic Model', () => {
  describe('Top Level', () => {
    it('should return the lop level (null parent_id) topics ', (done) => {
      Topic.collection().query((qb) => {
        qb.whereNull('parent_id');
      })
      .fetch()
      .then((topics) => {
        const serializedTopics = topics.map(topic => topic.toJSON());
        const fixtureCount = topicFixtures.filter(topic => topic.parent_id === null).length;
        console.log('serializedTopics', serializedTopics);
        assert.ok(serializedTopics.length === fixtureCount);
        done();
      });
    });
    it('should return the lop level (null parent_id) topics when getByParentId is called', (done) => {
      Topic
      .getByParentId()
      .then((topics) => {
        const serializedTopics = topics.map(topic => topic.toJSON());
        const fixtureCount = topicFixtures.filter(topic => topic.parent_id === null).length;
        assert.ok(serializedTopics.length === fixtureCount);
        done();
      });
    });
    it('should return children and created when fetched', (done) => {
      Topic
      .where({ id: 1 })
      .fetch({
        withRelated: ['children', 'creator']
      })
      .then((topic) => {
        const childrenCount = topic.toJSON().children.length;
        const creator = topic.toJSON().creator;
        const fixtureChildrenCount = topicFixtures.filter(top => top.parent_id === 1).length;
        assert.ok(childrenCount === fixtureChildrenCount);
        assert.ok(creator.id === 1);
        done();
      });
    });
  });
});
