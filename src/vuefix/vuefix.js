#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('../util/cmd.js')
const parser = require('parse5')
const eslintfixer = require('./eslintfixer.js')
const stylelintfixer = require('./stylelintfixer.js')
const fs = require('fs')

module.exports = module.exports.default = function (files) {
  const vuefiles = files.filter(f => f.match(/\.(vue|js|scss)$/gi))

  vuefiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    if (filePath.match(/\.js/i)) {
      fs.writeFileSync(filePath, eslintfixer(fileContent))
    } else if(){
      stylelintfixer(fileContent).then((data) => {
        if (data.errored) {
          console.log(data.output)
          process.exit(1)
        } else {
          fs.writeFileSync(filePath, data.css)
        }
      })
    }else if (filePath.match(/\.vue/i)) {
      const fragment = parser.parseFragment(fileContent)
      const childNodes = fragment.childNodes
      for (let node of childNodes) {
        if (node.nodeName === 'script') {
          const scriptString = parser.serialize(node)
          node.childNodes[0].value = eslintfixer(scriptString)
          fs.writeFileSync(filePath, parser.serialize(fragment))
        } else if (node.nodeName === 'style') {
          const styleString = parser.serialize(node)

          stylelintfixer(styleString).then((data) => {
            if (data.errored) {
              console.log(data.output)
              process.exit(1)
            } else {
              node.childNodes[0].value = '\n' + data.css
              fs.writeFileSync(filePath, parser.serialize(fragment))
            }
          })
        }
      }
    }
    console.log(`${filePath} has formated`)
  })

  cmd.exec(`eslint ${vuefiles.join(' ')}`)
}
