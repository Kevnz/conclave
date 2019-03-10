const util = require('util')
const chalk = require('chalk')
const mapping = {
  log: chalk.blue,
  info: chalk.cyan,
  warn: chalk.yellow,
  error: chalk.red,
}

const labels = {
  log: chalk.bgBlue.white.bold,
  info: chalk.bgCyan.white.bold,
  warn: chalk.bgYellow.white.bold,
  error: chalk.bgRed.white.bold,
}

;['log', 'info', 'warn', 'error'].forEach(method => {
  const oldMethod = console[method].bind(console)
  // eslint-disable-next-line no-console
  console[method] = (...args) => {
    if (args.length > 1) {
      oldMethod(
        mapping[method](
          labels[method](` ${args[0]}: `),
          util.inspect(args[1], true, 4, true)
        )
      )
    } else {
      oldMethod(mapping[method](...args))
    }
  }
})
