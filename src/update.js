#!/usr/bin/env node

const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');

let updateRs = shell.exec(`npm outdated --json --registry=${config.registry}`, {
    silent: true
}).stdout;

if (!updateRs) {
    console.log(chalk.green('Already up-to-date!'));
    process.exit(0)
}

let updateJson = JSON.parse(updateRs);

let updatePkg = [];
for (let i in updateJson) {
    let version = updateJson[i].wanted;
    if (version == 'git') {
        updatePkg.push(i);
    } else {
        updatePkg.push(`${i}@${version}`);
    }
}

shell.exec(`npm i ${updatePkg.join(' ')} --registry=${config.registry}`)