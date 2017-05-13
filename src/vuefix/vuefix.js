#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('../util/cmd.js')
const parser = require('parse5')
const eslintfixer = require('./eslintfixer.js')
const fs = require('fs')

module.exports = module.exports.default = function(files) {
    const jsfiles = files.filter(f => f.match(/\.(js)$/gi))
    const vuefiles = files.filter(f => f.match(/\.(vue)$/gi))

    jsfiles.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        fs.writeFileSync(filePath, eslintfixer(fileContent))
        console.log(`${filePath} has formated`)
    })

    vuefiles.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const fragment = parser.parseFragment(fileContent)
        const childNodes = fragment.childNodes
        for (let node of childNodes) {
            if (node.nodeName === 'script') {
                const scriptString = parser.serialize(node)
                node.childNodes[0].value = eslintfixer(scriptString)
                fs.writeFileSync(filePath, parser.serialize(fragment))
                console.log(`${filePath} has formated`)
            }
        }
    })

    cmd.exec(`eslint ${jsfiles.join(' ')} ${vuefiles.join(' ')}`)
}