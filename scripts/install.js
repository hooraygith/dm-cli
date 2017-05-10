const shell = require('shelljs')
const ora = require('ora')

const dep = [
  'eslint@3.19.0',
  'eslint-config-standard@10.2.1',
  'eslint-plugin-standard@3.0.1',
  'eslint-plugin-import@2.2.0',
  'eslint-plugin-node@4.2.2',
  'eslint-plugin-promise@3.5.0',
  'eslint-plugin-html@1.7.0'
]

let command = `dm install -g ${dep.join(' ')}`
let spinner = ora(command).start()
shell.exec(command)
spinner.succeed('Already up-to-date!')
