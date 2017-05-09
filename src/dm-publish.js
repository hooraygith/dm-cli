#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')

let type = ''
let cmds = []

program
    .arguments('[newVersion]')
    .action(val => {
      type = val
    })
    .parse(process.argv)

shell.exec('dm update')
shell.exec('dm lint')
shell.exec('dm tag fetch')
shell.exec('npm --no-git-tag-version version ' + type)
shell.exec(`dm build dev`)
shell.exec(`dm build pd`)
shell.exec('dm release')

batch.exec(cmds)
