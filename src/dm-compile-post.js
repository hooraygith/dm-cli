#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')
const _DIR = process.cwd()

let env = ''

program
    .arguments('[env]')
    .action(val => {
      env = val
    })
    .parse(process.argv)

if (!env) {
  console.log(chalk.red('缺少环境变量 dm compile-post [环境名]'))
  process.exit(1)
}

if (shell.test('-f', `${_DIR}/build/compile-post.js`)) {
  shell.exec(`node ${_DIR}/build/compile-post.js ${env}`)
}
