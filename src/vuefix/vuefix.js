#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('../util/cmd.js')
const parser = require('parse5')
const eslintfixer = require('./eslintfixer.js')
// const stylelintfixer = require('./stylelintfixer.js')
const fs = require('fs')

module.exports = module.exports.default = function(files) {
    let jsfiles = files.filter(f => f.match(/\.(js)$/gi))
    let vuefiles = files.filter(f => f.match(/\.(vue)$/gi))
    let scssfiles = files.filter(f => f.match(/\.(scss)$/gi))

    cmd.log('============ format start ============')

    let jsPromise = jsfiles.map(filePath => new Promise((resolve, reject) => {
        setTimeout(() => {
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            fs.writeFileSync(filePath, eslintfixer(fileContent))
            console.log(`${filePath} has formated`)
            resolve(true)
        })
    }))

    let scssPromise = scssfiles.map(filePath => new Promise((resolve, reject) => {
        setTimeout(() => {
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            stylelintfixer(fileContent).then((rs) => {
                fs.writeFileSync(filePath, rs.css)
                console.log(`${filePath} has formated`)
                resolve(true)
            })
        })
    }))

    let vuePromise = vuefiles.map(filePath => new Promise((resolve, reject) => {
        setTimeout(() => {
            let fileContent = fs.readFileSync(filePath, 'utf-8')
            let fragment = parser.parseFragment(fileContent)
            let childNodes = fragment.childNodes
            let processQueue = {};
            for (let node of childNodes) {
                if (node.nodeName === 'script') {
                    processQueue.script = node;
                } else if (node.nodeName === 'style') {
                    processQueue.style = node;
                }
            }

            let scriptString = parser.serialize(processQueue.script)
            processQueue.script.childNodes[0].value = eslintfixer(scriptString)

            let styleString = parser.serialize(processQueue.style)
            stylelintfixer(styleString).then((rs) => {
                processQueue.style.childNodes[0].value = ((rs.css.indexOf('\n') === 0) ? '' : '\n') + rs.css
                fs.writeFileSync(filePath, parser.serialize(fragment));
                console.log(`${filePath} has formated`);
                resolve(true)
            })
        })
    }))


    Promise.all(jsPromise.concat(vuePromise, scssPromise)).then(() => {
        cmd.log('============ format end ============')
        cmd.log('============ lint start ============')
        cmd.exec(`eslint ${jsfiles.join(' ')} ${vuefiles.join(' ')}`)
        // cmd.exec(`stylelint ${scssfiles.concat(vuefiles).join(' ')}`)
        cmd.log('lint end')
    })
}