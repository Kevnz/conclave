/* eslint-env node, mocha */

const assert = require('assert');
const messageFixtures1 = require('../../../fixtures/messages-fixture-1.json').messages;
const messageFixtures2 = require('../../../fixtures/messages-fixture-2.json').messages;
const Message = require('../message');

const allMessagesFixture = messageFixtures1.concat(messageFixtures2);

describe('The Message Model', () => {
  describe('Top Level', () => {
    it('should return the lop level Messages for a topic ', (done) => {
      Message.collection().query((qb) => {
        qb.where('topic_id', 1);
      })
      .fetch()
      .then((messages) => {
        const serializedMessages = messages.map(message => message.toJSON());
        const fixtureCount = allMessagesFixture.filter(message => message.topic_id === 1).length;
        assert.ok(serializedMessages.length === fixtureCount);
        done();
      })
      .catch(err=> console.log(err));
    });
    it('should return the lop level (null parent_id) topics when getByTopic is called', (done) => {
      Message
      .getByTopic(1)
      .then((messages) => {
        const serializedMessages = messages.map(message => message.toJSON());
        const fixtureCount = allMessagesFixture.filter(message => message.topic_id === 1).length;
        assert.ok(serializedMessages.length === fixtureCount);
        done();
      });
    });
  });
});
