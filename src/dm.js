#!/usr/bin/env node

const program = require('commander')

program
  .command('start', '启动服务')
  .command('pack', '打包')
  .command('push', '上传')
  .command('lint', '格式检查')
  .command('update', '更新依赖')
  .command('tag', 'tag处理')
  .command('build', '编译命令')
  .command('compile', '编译处理钩子')
  .command('compile-pre', '编译前置钩子')
  .command('compile-post', '编译后置钩子')
  .parse(process.argv)
