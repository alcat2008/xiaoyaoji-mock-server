/* eslint-disable no-console */
const chalk = require('chalk')
const detect = require('detect-port')
const clearConsole = require('react-dev-utils/clearConsole')
const openBrowser = require('react-dev-utils/openBrowser')
const prompt = require('react-dev-utils/prompt')
const debug = require('debug')('xiaoyaoji-mock-server:app')

const initApp = require('./index')

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)

  clearConsole()
  console.log(chalk.cyan('Mock server is running on port [', addr.port, ']'))
  console.log(chalk.cyan('For further info, please visite http://127.0.0.1:' + addr.port + '/'))
  console.log()

  // openBrowser('http://127.0.0.1:' + addr.port + '/');
}

function run(port, profile) {
  /**
   * Listen on provided port, on all network interfaces.
   */

  initApp(port, profile)
}

exports.start = function start(program) {
  // const port = normalizePort(process.env.PORT || '5000');
  const defaultPort = normalizePort((program && program.port) || 5000)
  const defaultProfile = program && program.file

  console.log()

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
  detect(defaultPort).then(port => {
    if (port === defaultPort) {
      run(port, defaultProfile)
      return
    }

    clearConsole()
    const question =
      chalk.yellow('Something is already running on port ' + defaultPort + '.') +
      '\n\nWould you like to run the app on another port instead?'

    prompt(question, true).then(shouldChangePort => {
      if (shouldChangePort) {
        run(port, defaultProfile)
      }
    })
  })
}
