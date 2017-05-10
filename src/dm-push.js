#!/usr/bin/env node

const shell = require('shelljs')
const cmd = require('./util/cmd.js');
const program = require('commander')
const _DIR = process.cwd()
const package = require(_DIR + '/package.json')


cmd.exec('git add -A')
cmd.exec(`git commit -m ${package.version} --no-verify`)
cmd.exec(`git tag v${package.version}`)
cmd.exec(`git push origin v${package.version}`)

let branch = cmd.exec('git symbolic-ref --short -q HEAD')
cmd.exec(`git push origin ${branch}`)