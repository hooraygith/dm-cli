#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')

let regexp = ''

program
  .option('-A, --all', '删除全部tag')
  .arguments('[regexp]')
  .action(val => {
    regexp = val
  })
  .parse(process.argv)

if (program.all) {
  //删除本地全部tag
  shell.exec('git tag -l | xargs git tag -d')
  process.exit(0)
}

if (!regexp) {
  //检测是否输入patterns
  console.log(chalk.yellow('Please enter regexp! tag clear [regexp]'))
  process.exit(1)
}

shell.exec(
  `git show-ref --tag | awk '/(${regexp}.*)/ {print ":"$2}' | xargs git push origin`
)
