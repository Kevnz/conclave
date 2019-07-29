module.exports = (item, attributes) => {
  const elements = attributes.map(attr => {
    if (attr === 'id') {
      return `<td> <a href="${item[attr]}">${item[attr]}</a> </td>`
    }
    return `<td> ${item[attr]} </td>`
  })

  return `<tr>${elements.join('')}</tr>`
}
