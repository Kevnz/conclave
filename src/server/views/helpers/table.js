const rowGen = require('./row')
const headGen = require('./header')

module.exports = (items, attributes) => {
  const head = headGen(attributes)
  const rows =
    items && items.length > 0
      ? items.map(item => rowGen(item, attributes))
      : [`<tr><td colspan="${attributes.length}">No Records</td></tr>`]

  return `<div class="table-container"><table class="table is-striped is-bordered  is-hoverable is-fullwidth">
  ${head}
  <tbody>
  ${rows.join('')}
  </tbody>
  </table></div>`
}
