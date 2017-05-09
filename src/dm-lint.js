#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')
const _DIR = process.cwd()

if (shell.test('-f', `${_DIR}/src`)) { // 当没有src目录时 vuefix会报错，加个判断修复
    shell.exec('vuefix -d src')
}