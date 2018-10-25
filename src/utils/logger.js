const chalk = require('chalk')

const util = require('util')

const mapping = {
  log: chalk.cyan,
  warn: chalk.yellow,
  error: chalk.red,
}

const labels = {
  log: chalk.bgBlue.white.bold,
  warn: chalk.bgYellow.white.bold,
  error: chalk.bgRed.white.bold,
}
;['log', 'warn', 'error'].forEach(method => {
  const oldMethod = console[method].bind(console)
  console[method] = (...args) => {
    if (args.length > 1) {
      oldMethod(
        mapping[method](
          labels[method](`\n \n ${args[0].toUpperCase()}: \n \n`),
          util.inspect(args[1], true, 4, true)
        )
      )
    } else {
      oldMethod(mapping[method](...args))
    }
  }
})
