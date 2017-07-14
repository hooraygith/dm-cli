#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('./util/cmd.js')
const program = require('commander')
const semver = require('semver')
const _DIR_ = process.cwd()
const packageInfo = require(`${_DIR_}/package.json`)

let type = ''
let version = packageInfo.version

program
    .arguments('[newVersion...]')
    .action((val) => {
        type = val
    })
    .parse(process.argv)

cmd.exec('dm update')
cmd.exec('dm lint')
cmd.exec('dm tag fetch')

// 生成版本号
if (semver.valid(type[0])) {
    version = type[0]
} else {
    version = semver.inc(version, type[0], type[1])
}
cmd.exec(`npm --no-git-tag-version version ${version}`)
cmd.exec(`dm build dev pd`)

cmd.exec('git add -A')
cmd.exec(`git commit -m '${version}' -n`)
cmd.exec(`git tag v${version}`)
cmd.exec(`git push origin ${version}`)

let branch = cmd.exec('git symbolic-ref --short -q HEAD')
cmd.exec(`git push origin ${branch}`)
