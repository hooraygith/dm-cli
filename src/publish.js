#!/usr/bin/env node

const batch = require('./util/batch.js');
const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');
const program = require('commander');

let newVersion = '';
let envs = ['dev','pd'];
let cmds = [
    'update',
    'lint',
    'tag fetch',
];

program
    .arguments('[newVersion]')
    .action(val => {
        newVersion = val;
    })
    .parse(process.argv);

//todo 用semver升级版本号；semver.inc(newVersion)
cmds.push('npm --no-git-tag-version version ' + newVersion);

for (let env of envs) {
    cmds.push(`compile ${env}`);
}

cmds.push('git add -A');
//todo 新建tag
//todo 提交tag和分支代码

batch.exec(cmds);