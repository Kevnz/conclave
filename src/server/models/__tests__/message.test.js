const messageFixtures = require('../../../fixtures/messages-fixture.json')
const Message = require('../message')

describe('The Message Model', () => {
  it('should match the snapshopt', async () => {
    const message = await Message.where({ id: 1 }).fetch()
    const snapshotMessage = message.toJSON()
    delete snapshotMessage.created_at
    delete snapshotMessage.updated_at
    delete snapshotMessage.createdOn
    expect(snapshotMessage).toMatchSnapshot()
  })

  describe('Top Level', () => {
    it('should return the lop level (null parent_id) messages ', () => {
      return Message.collection()
        .query(qb => {
          qb.whereNull('parent_id')
        })
        .fetch()
        .then(messages => {
          const serializedMessages = messages.map(topic => topic.toJSON())
          const fixtureCount = messageFixtures.filter(
            topic => topic.parent_id === null
          ).length

          expect(serializedMessages.length === fixtureCount)
        })
    })
    it('should return the lop level (null parent_id) messages for a topic', () => {
      return Message.getByTopic(1).then(messages => {
        const serializedMessages = messages.map(message => message.toJSON())
        const fixtureCount = messageFixtures.filter(
          message => message.parent_id === null
        ).length
        expect(serializedMessages.length === fixtureCount)
      })
    })
    it('should return replies', () => {
      return Message.getReplies(11).then(messages => {
        const replies = messages.toJSON().length
        const fixtureRepliesLength = messageFixtures.filter(
          m => m.parent_id === 11
        ).length
        expect(replies).toBe(fixtureRepliesLength)
      })
    })
  })
})
