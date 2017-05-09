#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')

let type = ''
let envs = [];

program
    .arguments('[newVersion] [envs...]')
    .action((val, val2) => {
        type = val
        envs = val2.length ? val2 : ['dev', 'pd']
    })
    .parse(process.argv)

shell.exec('dm update')
shell.exec('dm lint')
shell.exec('dm tag fetch')
shell.exec('npm --no-git-tag-version version ' + type)
shell.exec(`dm build ${envs.join(' ')}`)
shell.exec('dm release')