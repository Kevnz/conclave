const userGenerator = require('./generators/users');
const topicGenerator = require('./generators/topics');
const messageGenerator = require('./generators/messages');
const fs = require('fs');
const pretty = require('js-object-pretty-print').pretty;

const users = [];
const topics = [];
const messages = [];
const messages2 = [];

for (let i = 0; i < 20; i++) {
  users.push(userGenerator());
}
for (let i = 0; i < 5; i++) {
  topics.push(topicGenerator());
}
for (let i = 0; i < 50; i++) {
  messages.push(messageGenerator());
}
for (let i = 0; i < 10; i++) {
  messages2.push(messageGenerator(2));
}

const userContent = pretty({ users }, 2, 'json');
const topicContent = pretty({ topics }, 2, 'json');
const messagesBlock1 = pretty({ messages }, 2, 'json');
const messagesBlock2 = pretty({ messages: messages2 }, 2, 'json');

fs.writeFileSync('./fixtures/users-fixture.json', userContent);
fs.writeFileSync('./fixtures/topics-fixture.json', topicContent);
fs.writeFileSync('./fixtures/messages-fixture-1.json', messagesBlock1);
fs.writeFileSync('./fixtures/messages-fixture-2.json', messagesBlock2);
