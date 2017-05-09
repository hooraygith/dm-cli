#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')

program
  .command('start', '启动服务')
  .command('publish', '发布')
  .command('release', 'rc')
  .command('lint', '格式检查')
  .command('build', '编译')
  .command('update', '更新依赖')
  .command('tag', 'tag处理')
  .command('compile', '编译处理')
  .command('compile-pre', '编译前置钩子')
  .command('compile-post', '编译后置钩子')
  .parse(process.argv)
