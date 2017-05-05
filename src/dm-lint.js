#!/usr/bin/env node

const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');
const program = require('commander');

shell.exec('eslint --fix --ext .js,.vue src')