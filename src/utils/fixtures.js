const fs = require('fs')
const userGenerator = require('./generators/users')
const topicGenerator = require('./generators/topics')
const messageGenerator = require('./generators/messages')
const random = (min, max) => Math.round(Math.random() * (max - min) + min)

const users = []
const topics = []
const messages = []

for (let i = 1; i < 21; i++) {
  users.push(userGenerator(i))
}
for (let i = 1; i < 6; i++) {
  topics.push(topicGenerator(i, random(1, 20)))
}
for (let i = 6; i < 11; i++) {
  topics.push(topicGenerator(i, random(1, 20), random(1, 5)))
}
for (let i = 11; i < 26; i++) {
  topics.push(topicGenerator(i, random(1, 20), random(6, 10)))
}
for (let i = 1; i < 101; i++) {
  messages.push(messageGenerator(i, random(1, 5), random(1, 20)))
}
for (let i = 101; i < 201; i++) {
  messages.push(
    messageGenerator(i, random(1, 25), random(1, 20), random(1, 100))
  )
}
const userContent = JSON.stringify(users, null, 2)
const topicContent = JSON.stringify(topics, null, 2)
const messagesBlock1 = JSON.stringify(messages, null, 2)

fs.writeFileSync('./src/fixtures/users-fixture.json', userContent)
fs.writeFileSync('./src/fixtures/topics-fixture.json', topicContent)
fs.writeFileSync('./src/fixtures/messages-fixture.json', messagesBlock1)
