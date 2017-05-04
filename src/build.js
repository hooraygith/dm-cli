#!/usr/bin/env node

const batch = require('./util/batch.js');
const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');
const program = require('commander');

let envs = '';
let cmds = [
    'update'
];

program
    .arguments('[envs...]')
    .action(val => {
        envs = val;
    })
    .parse(process.argv);

if (!envs.length) { //检测是否输入envs
    console.log(chalk.yellow('Please enter envs! build [envs]'));
    process.exit(1);
}

for (let env of envs) {
    cmds.push(`compile ${env}`);
}

batch.exec(cmds);