module.exports = (items, className, current) => {
  console.log('current', current)
  console.log(items)
  const rows =
    items && items.length > 0
      ? items.map(
          item =>
            `<li><a class="model-name ${
              item === current ? 'is-active' : ''
            }" href="/admin/view/${item}/">${item}</a></li>`
        )
      : [` `]

  return `<ul class="${className}">
  ${rows.join('')}
  </ul>`
}
