#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('../util/cmd.js')
const parser = require('parse5')
const eslintfixer = require('./eslintfixer.js')
const fs = require('fs')

module.exports = module.exports.default = function (files) {
  const vuefiles = files.filter(f => f.match(/\.(vue|js|scss)$/gi))

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
          fs.writeFileSync(filePath, parser.serialize(fragment))
        }
      }
    }
    console.log(`${filePath} has formated`)
  })

  cmd.exec(`eslint ${vuefiles.join(' ')}`)
}
