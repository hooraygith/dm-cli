#!/usr/bin/env node

const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')
const package = require(process.cwd() + '/package.json')


shell.exec('git add -A')
shell.exec(`git commit -m ${package.version} --no-verify`)
shell.exec(`git tag v${package.version}`)
shell.exec(`git push origin v${package.version}`)

let branch = shell.exec('git symbolic-ref --short -q HEAD',{silent:true}).stdout
shell.exec(`git push origin ${branch}`)