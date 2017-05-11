#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('./util/cmd.js')
// const program = require('commander')
// const _DIR = process.cwd()

const ora = require('ora')
const config = require('./config/index.js')

let command1 = `npm outdated --json --registry=${config.registry}\n` // 检查需要更新的包
let command2 = `npm i ` // 更新包
let spinner = ora(command1).start() // 加载动画

// 获取过期的包json
let updateRs = cmd.exec(`npm outdated --json --registry=${config.registry}`, {
  silent: true
}) || '{}'
let updateJson = JSON.parse(updateRs)
let updatePkg = []
for (let i in updateJson) {
  let version = updateJson[i].wanted
  if (version === updateJson[i].current) {
        // is update to date
  } else if (version === 'git') {
    updatePkg.push(i)
  } else {
    updatePkg.push(`${i}@${version}`)
  }
}

// 获取依赖中以git+ssh方式引入的包
let gitSSH = []
let rs = JSON.parse(cmd.exec('npm list -g --depth=0 --json', {
  silent: true
})).dependencies
for (let i in rs) {
  if (rs[i].from.indexOf('git+ssh') !== -1) {
    gitSSH.push(`${i}`)
  }
}

// 如果都为空则提示全部更新完毕
if (!updatePkg.length && !gitSSH.length) {
  spinner.succeed('Already up-to-date!')
  process.exit(0)
}

let date = new Date()
command2 += updatePkg.join(' ')
spinner.text = command2
cmd.exec(`npm i ${updatePkg.join(' ')} ${gitSSH.join(' ')} --registry=${config.registry}`)
spinner.succeed(`end ${(new Date().getTime() - date) / 1000} s`)
