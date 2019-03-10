require('xtconf')()
const serverSetup = require('./server')
let app

const start = async () => {
  try {
    app = await serverSetup()
    await app.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.info('🚀 Server running')
}

process.on('SIGINT', async () => {
  console.info('stopping server')
  try {
    await app.stop({ timeout: 10000 })
    console.warn('The server has stopped 🛑')
    process.exit(0)
  } catch (err) {
    console.error('shutdown server error', err)
    process.exit(1)
  }
})

start()
