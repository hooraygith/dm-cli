#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')
const _DIR = process.cwd()

program.option('-E, --env [env]', '要编译的环境').parse(process.argv)

if (!program.env) {
  console.log(chalk.red('请输入要编译的环境变量 compile --env [环境名]'))
  process.exit(1)
}

if (!shell.test('-f', `${_DIR}/build/webpack.config.${program.env}.js`)) {
  console.log(chalk.red(`找不到文件：${_DIR}/build/webpack.config.${program.env}.js`))
  process.exit(1)
}

console.log(chalk.yellow('============compile============'))

// compile前置钩子
if (shell.test('-f', `${_DIR}/build/build-pre.js`)) {
  shell.exec(`node ${_DIR}/build/build-pre.js`)
}

const webpack = require('webpack')
const webpackConfig = require(_DIR +
  '/build/webpack.config.' +
  program.env +
  '.js')

// returns a Compiler instance
const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  console.log(
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    })
  )

  // compile 后置钩子
  if (shell.test('-f', `${_DIR}/build/build-post.js`)) {
    shell.exec(`node ${_DIR}/build/build-post.js`)
  }
  console.log(chalk.yellow('============end============'))
})
