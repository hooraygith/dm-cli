#!/usr/bin/env node

const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');
const program = require('commander');

let tag = '';

program
    .arguments('[tag]')
    .action(val => {
        tag = val;
    })
    .parse(process.argv);

if (!tag) {// 检测是否输入tag
    console.log(chalk.red('Pleae enter tag value! tag push [tag]'));
    process.exit(1);
}

shell.exec(`git push origin ${tag}`);