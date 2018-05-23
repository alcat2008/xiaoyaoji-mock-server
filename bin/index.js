#!/usr/bin/env node

const path = require('path')
const program = require('commander')
const pkg = require('../package.json')

const Mocker = require('../lib/App.js')

program
  .version(pkg.version)
  .usage('[command] [options]')
  .option('-f, --file <path>', 'specify path of profile, defaults to ./profile.json',
    path.join(__dirname, './profile.json'))
  .option('-p, --port [number]', 'set server port [5000]', '5000')
  .option('-pf, --prefix [prefix]', 'prefix placeholder array, split by \',\'', '$prefix$')
  .parse(process.argv)

Mocker.start(program)

process.on('SIGINT', () => {
  program.runningCommand && program.runningCommand.kill('SIGKILL')
  process.exit(0)
})
