'use strict';

const shell = require('shelljs')

const dep = {
  'eslint': '3.19.0',
  'eslint-config-dianmife': '0.1.4',
  'eslint-config-standard': '10.2.1',
  'eslint-plugin-standard': '3.0.1',
  'eslint-plugin-import': '2.2.0',
  'eslint-plugin-node': '4.2.2',
  'eslint-plugin-promise': '3.5.0',
  'eslint-plugin-html': '1.7.0'
}

let install = []

let rs = JSON.parse(shell.exec('npm list -g --depth=0 --json', {
  silent: true
}).stdout)

for (let i in dep) {
  if (rs.dependencies && rs.dependencies[i] && dep[i] !== rs.dependencies[i].version) {
    install.push(`${i}@${dep[i]}`)
  }
}

if (install.length > 0) {
  let command = `dm install -g ${install.join(' ')}`
  console.log(command)
  shell.exec(command)
}
