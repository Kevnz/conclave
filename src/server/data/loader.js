const DataLoader = require('dataloader')

module.exports = (loadFn, key) => {
  console.log('loader called')
  return new DataLoader(loadFn, {})
}
