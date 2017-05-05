#!/usr/bin/env node

const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');
const ora = require('ora');

let command1 = `npm outdated --json --registry=${config.registry}`; //检查需要更新的包
let command2 = `npm i `; //更新包
let spinner = ora(command1).start(); //加载动画

let updateRs = shell.exec(`npm outdated --json --registry=${config.registry}`, {
    silent: true
}).stdout;

if (!updateRs) {
    spinner.succeed('Already up-to-date!');
    process.exit(0)
}

let updateJson = JSON.parse(updateRs);

let updatePkg = [];
for (let i in updateJson) {
    let version = updateJson[i].wanted;
    if (version == updateJson[i].current) {
        //is update to date
    } else if (version == 'git') {
        updatePkg.push(i);
    } else {
        updatePkg.push(`${i}@${version}`);
    }
}

if (updatePkg.length == 0) {
    spinner.succeed('Already up-to-date!');
    process.exit(0)
}

let date = new Date();
command2 = command2 + updatePkg.join(' ') + '\n';
spinner.start(command2);
shell.exec(`npm i ${updatePkg.join(' ')} --registry=${config.registry}`)
spinner.succeed(`end ${(new Date().getTime() - date)/1000} s`)