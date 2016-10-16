const userGenerator = require('./generators/users');
const topicGenerator = require('./generators/topics');
const fs = require('fs');
const pretty = require('js-object-pretty-print').pretty;

const users = [];
const topics = [];

for (let i = 0; i < 20; i++) {
  users.push(userGenerator());
}
for (let i = 0; i < 5; i++) {
  topics.push(topicGenerator());
}

const userContent = pretty({ users }, 2, 'json');
const topicContent = pretty({ topics }, 2, 'json');

fs.writeFileSync('./fixtures/users-fixture.json', userContent);
fs.writeFileSync('./fixtures/topics-fixture.json', topicContent);
