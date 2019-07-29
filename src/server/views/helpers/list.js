module.exports = items => {
  const rows =
    items && items.length > 0
      ? items.map(
          item =>
            `<li><a class="model-name" href="/admin/view/${item}/">${item}</a></li>`
        )
      : [` `]

  return `<ul>
  ${rows.join('')}
  </ul>`
}
