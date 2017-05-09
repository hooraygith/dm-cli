#!/usr/bin/env node

const batch = require('./util/batch.js')
const shell = require('shelljs')
const config = require('./config/index.js')
const chalk = require('chalk')
const program = require('commander')

let type = ''
let cmds = []

program
    .arguments('[newVersion]')
    .action(val => {
      type = val
    })
    .parse(process.argv)

cmds.push('dm update')
cmds.push('dm lint')
cmds.push('dm tag fetch')
// todo 用semver升级版本号；semver.inc(type)
cmds.push('npm --no-git-tag-version version ' + type)
cmds.push(`compile dev`)
cmds.push(`compile pd`)
cmds.push('git add -A')
// todo commit and new tag
// todo push

batch.exec(cmds)
