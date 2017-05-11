#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('./util/cmd.js')
const program = require('commander')
// const _DIR = process.cwd()

let type = ''
let envs = []

program
    .arguments('[newVersion] [envs...]')
    .action((val, val2) => {
      type = val
      envs = val2.length ? val2 : ['dev', 'pd']
    })
    .parse(process.argv)

cmd.exec('dm update')
cmd.exec('dm lint')
cmd.exec('dm tag fetch')

let version = cmd.exec(`npm --no-git-tag-version version ${type}`)
cmd.exec(`dm build ${envs.join(' ')}`)

cmd.exec('git add -A')
cmd.exec(`git commit -m '${version.replace('v', '')}' -n`)
cmd.exec(`git tag ${version}`)
cmd.exec(`git push origin ${version}`)

let branch = cmd.exec('git symbolic-ref --short -q HEAD')
cmd.exec(`git push origin ${branch}`)
