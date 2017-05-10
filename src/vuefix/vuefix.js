// const shell = require('shelljs')
const cmd = require('../util/cmd.js')
const parser = require('parse5')
const eslint = require('eslint')
const fs = require('fs')

const eslintfixer = (input) => {
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

const vuefix = (files) => {
  const vuefiles = files.filter(f => f.match(/\.(vue|js)$/gi))
  cmd.exec(`eslint ${vuefiles.join(' ')}`)
  vuefiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    if (filePath.match(/\.js/i)) {
      fs.writeFileSync(filePath, eslintfixer(fileContent))
    } else if (filePath.match(/\.vue/i)) {
      const fragment = parser.parseFragment(fileContent)
      const childNodes = fragment.childNodes
      for (let node of childNodes) {
        if (node.nodeName === 'script') {
          const scriptString = parser.serialize(node)
          node.childNodes[0].value = eslintfixer(scriptString)
        }
      }
      fs.writeFileSync(filePath, parser.serialize(fragment))
    }
    console.log(`${filePath} has formated`)
  })
}

module.exports = module.exports.default = vuefix
