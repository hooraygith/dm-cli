#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')

if (!shell.test('-f', process.cwd() + '/build/webpack.config.server.js')) {
  console.log(
    chalk.red('找不到文件：' + process.cwd() + '/build/webpack.config.server.js')
  )
  process.exit(1)
}

//todo 配置不存在 写入server.config.js

//todo 执行前置钩子函数

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const serverConfig = require(process.cwd() + '/build/server.config.js')
const config = require(process.cwd() + '/build/webpack.config.server.js')
config.entry.index.unshift(
  'webpack-dev-server/client?http://' + serverConfig.host + '/',
  'webpack/hot/dev-server'
)
config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.output.filename = '[name].[hash].js'

let server = new webpackDevServer(webpack(config), {
  // hot: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: {
    chunks: false, // Makes the build much quieter
    colors: true
  }
})
server.listen(serverConfig.port, 'localhost', () => {
  console.log(`正在编译中...片刻后可访问: http://${serverConfig.host}/index.html`)
})
