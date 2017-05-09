#!/usr/bin/env node

const shell = require('shelljs')
const cmd = require('./util/cmd.js');
const program = require('commander')
const _DIR = process.cwd()

program
    .option('-C, --commit','修复后是否需要提交')
    .parse(process.argv)

if (shell.test('-f', `${_DIR}/src`)) { // 当没有src目录时 vuefix会报错，加个判断修复
    cmd.exec('vuefix -d src')

    if(program.commit){
        cmd.exec('git add -A')
    }
}