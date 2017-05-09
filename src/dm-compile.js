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
  console.log(chalk.red('请输入要编译的环境变量 dm build [环境名]'))
  process.exit(1)
}

if (!shell.test('-f', `${_DIR}/build/webpack.config.${env}.js`)) {
  console.log(chalk.red(`找不到文件：${_DIR}/build/webpack.config.${env}.js`))
  process.exit(1)
}

const webpack = require('webpack')
const webpackConfig = require(_DIR +
    '/build/webpack.config.' +
    env +
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
})
