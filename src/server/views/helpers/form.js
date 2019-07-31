const to = require('to-case')
const readonly = ['created_at', 'createdOn', 'updated_at']
module.exports = (attributes, item = null) => {
  const rows = attributes.map(attr => {
    const isDisabled = readonly.includes(attr)

    if (!item) {
      return `<div class="field">
        <label class="label">${to.capital(attr)}</label>
        <div class="control">
          <input class="input" ${isDisabled ? 'disabled' : ''}
            type="text"
            name="${attr}"
            value=""
          />
        </div>
      </div>`
    }
    if (attr === '_id' && item) {
      return `<div class="field">
      <label class="label">${to.capital(attr)}</label><div class="control">
      <input class="input" type="hidden" name="${attr}" value="${
        item ? item[attr] : ''
      }" />
      </div>
      </div>`
    } else if (attr === '_id' && !item) {
      return ''
    } else if (attr === 'user') {
      return ''
    }

    if (item[attr] && item[attr].length) {
      console.log(item[attr].length)
    }
    if (item[attr] && item[attr].length > 100) {
      return `<div class="field">
        <label class="label">${to.capital(attr)}</label>
        <div class="control">
          <textarea class="textarea"
            name="${attr}">${item[attr]}</textarea>
        </div>
      </div>`
    }

    return `<div class="field">
        <label class="label">${to.capital(attr)}</label>
        <div class="control">
          <input class="input"
            ${isDisabled ? 'disabled' : ''}
            type="text"
            name="${attr}"
            value="${item ? item[attr] : ''}"
          />
        </div>
      </div>`
  })

  return `<form class="form" method="${item ? 'PUT' : 'POST'}">
  ${rows.join('')}
  <div class="field"><input class="button is-primary" type="submit" value="${
    item ? 'Update' : 'Save'
  }" /></div>
  </form>`
}
