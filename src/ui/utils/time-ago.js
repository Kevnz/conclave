export const timeAgo = d => {
  if (!d) return 'unknown'
  const date = new Date(d)
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  const thresholds = [
    {
      threshold: 540 * day,
      modifier: 365 * day,
      render: elapsed => `${elapsed} years ago`,
    },
    { threshold: 320 * day, render: () => 'a year ago' },
    {
      threshold: 45 * day,
      modifier: 30 * day,
      render: elapsed => `${elapsed} months ago`,
    },
    { threshold: 26 * day, render: () => 'a month ago' },
    {
      threshold: 36 * hour,
      modifier: 24 * hour,
      render: elapsed => `${elapsed} days ago`,
    },
    { threshold: 22 * hour, render: () => 'a day ago' },
    {
      threshold: 90 * minute,
      modifier: 60 * minute,
      render: elapsed => `${elapsed} hours ago`,
    },
    { threshold: 45 * minute, render: () => 'an hour ago' },
    {
      threshold: 90 * second,
      modifier: 60 * second,
      render: elapsed => `${elapsed} minutes ago`,
    },
    { threshold: 46 * second, render: () => 'a minute ago' },
    { threshold: 0 * second, render: () => 'a few seconds ago' },
  ]

  const elapsed = Math.round(new Date() - date)
  const all = thresholds.find(({ threshold }) => elapsed >= threshold)

  const { render, modifier } = all
  return render(Math.round(elapsed / modifier))
}
