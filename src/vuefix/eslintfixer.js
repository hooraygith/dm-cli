#!/usr/bin/env node

const eslint = require('eslint')

module.exports = function (input) {
  let CLIEngine
  let cliEngine
  let report
  let output
  try {
    CLIEngine = eslint.CLIEngine
    cliEngine = new CLIEngine({
      fix: true
    })
    report = cliEngine.executeOnText(input)
    output = report.results[0].output || input // 如果没有错误, reports，不包含 output,此时原样输出
    return output
  } catch (err) {
    console.log(err)
            // process.stderr.write(err) // Missing `eslint`, `.eslintrc`
    process.exit(1)
  }
}
