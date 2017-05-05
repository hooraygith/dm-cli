#!/usr/bin/env node

const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');
const program = require('commander');

program
    .command('clear', '删除tag')
    .command('fetch', '获取tag')
    .command('push', '提交tag')
    .parse(process.argv)