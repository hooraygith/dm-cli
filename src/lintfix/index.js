#!/usr/bin/env node

// const shell = require('shelljs')
const cmd = require('../util/cmd.js')
const jslintfix = require('./jslintfix.js')
const scsslintfix = require('./scsslintfix.js')
const vuelintfix = require('./vuelintfix.js')
const Reporter = require('../util/Reporter.js')

module.exports = module.exports.default = function(files, callback) {
    cmd.log('============ lint start ============')

    Promise.all(files.map((f) => {
        if (f.match(/^((?!(dist\/|vendor\/|docs\/)).)*$/gi)) { // vendor、dist、docs文件夹不检测
            if (f.match(/^(?!.+\.min.js$).+\.js$/gi)) { // 压缩文件不检测
                return jslintfix(f)
            } else if (f.match(/\.(scss)$/gi)) {
                return scsslintfix(f)
            } else if (f.match(/\.(vue)$/gi)) {
                return vuelintfix(f)
            }
        }
    })).then((lintError) => {
        Reporter.report(lintError)

        cmd.log('============ lint end ============')

        callback && callback()
    })
}
