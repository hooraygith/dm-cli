#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('./util/cmd.js')
const program = require('commander')
// const _DIR = process.cwd()

let type = ''

program
    .arguments('[newVersion]')
    .action((val) => {
      type = val
    })
    .parse(process.argv)

cmd.exec(`dm pack ${type} dist`)
