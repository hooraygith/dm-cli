#!/usr/bin/env node

const cmd = require('./util/cmd.js')
// const program = require('commander')
// const _DIR = process.cwd()

const config = require('./config/index.js')

cmd.exec(`npm i --registry=${config.registry}`)
