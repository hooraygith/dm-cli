#!/usr/bin/env node

const shell = require('shelljs')
const cmd = require('./util/cmd.js');
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
    cmd.error('请输入要编译的环境变量 dm build [环境名]')
}

if (!shell.test('-f', `${_DIR}/build/webpack.config.${env}.js`)) {
    cmd.error(`找不到文件：${_DIR}/build/webpack.config.${env}.js`);
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