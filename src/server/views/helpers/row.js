const timeAgo = require('../../utils/time-ago')
module.exports = (item, attributes) => {
  const elements = attributes.map(attr => {
    if (attr === 'id') {
      return `<td> <a href="${item[attr]}">${item[attr]}</a> </td>`
    }
    if (
      attr === 'created_at' ||
      attr === 'updated_at' ||
      attr === 'createdOn'
    ) {
      return `<td> ${timeAgo(item[attr])} </td>`
    }

    return `<td> ${item[attr]} </td>`
  })
  return `<tr>${elements.join('')}</tr>`
}
