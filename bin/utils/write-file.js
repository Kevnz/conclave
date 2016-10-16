const fs = require('fs');

module.exports = function writeFile(path, content) {
  fs.writeFileSync(path, content);
};
