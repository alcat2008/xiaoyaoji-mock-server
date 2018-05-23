/* eslint-disable no-console */
const clearConsole = require('react-dev-utils/clearConsole')
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils')

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

function run(port, profile, prefixs) {
  /**
   * Listen on provided port, on all network interfaces.
   */

  initApp(port, profile, prefixs)
}

exports.start = function start(program) {
  // const port = normalizePort(process.env.PORT || '5000');
  const defaultPort = normalizePort((program && program.port) || 5000)
  const defaultProfile = program && program.file
  const defaultPrefixs = program && program.prefix && program.prefix.split(',')

  const HOST = process.env.HOST || '0.0.0.0'

  // We attempt to use the default port but if it is busy, we offer the user to
  // run on a different port. `detect()` Promise resolves to the next free port.
  choosePort(HOST, defaultPort)
    .then(port => {
      if (port == null) {
        // We have not found a port.
        return
      }

      clearConsole()
      run(port, defaultProfile, defaultPrefixs)
    })
}
