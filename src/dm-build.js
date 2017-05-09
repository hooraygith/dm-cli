#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')
const _DIR = process.cwd()

let envs = []

program
    .arguments('[env...]')
    .action(val => {
      envs = val
    })
    .parse(process.argv)

if (!envs.length) {
  console.log(chalk.red('请输入要编译的环境变量,多个环境以逗号分隔 dm build [环境名,环境名]'))
  process.exit(1)
}

console.log(chalk.yellow('============ compile ============'))

for (let env of envs) {
  shell.exec(`dm compile-pre ${env}`)
  shell.exec(`dm compile ${env}`)
  shell.exec(`dm compile-post ${env}`)
}

console.log(chalk.yellow('============   end   ============'))
