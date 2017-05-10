#!/usr/bin/env node

const cmd = require('./util/cmd.js')
const program = require('commander')
// const _DIR = process.cwd()
const config = require('./config/index.js')

let dep = []

program
    .arguments('[dep...]')
    .action(val => {
      dep = val
    })
    .parse(process.argv)

cmd.exec(`npm i --registry=${config.registry} ${dep.join(' ')}`)
