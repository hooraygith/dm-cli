#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package.json').version)
  .command('start', '启动服务')
  .command('build', '打包(compile-pre -> compile -> compile-post)')
  .command('version', '打包(update -> lint -> build -> tag -> push)')
  .command('lint', '格式化&&eslint')
  .command('update', '更新依赖')
  .command('tag', 'tag处理')
  .command('compile-pre', '编译前置钩子')
  .command('compile', '编译处理钩子')
  .command('compile-post', '编译后置钩子')
  .parse(process.argv)
