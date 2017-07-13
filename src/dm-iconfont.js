#!/usr/bin/env node

const fs = require('fs')
const cmd = require('./util/cmd.js')
const program = require('commander')
const axios = require('axios')

let fileName = ''

program
    .arguments('[fileName]')
    .action(val => {
        fileName = val
    })
    .parse(process.argv)

if (!fileName) {
    cmd.error('请输入要更新的iconfont文件名 dm iconfont [fileName]')
}

cmd.log('============ iconfont update ============')

axios.defaults.baseURL = 'http://at.alicdn.com'
axios.get(`/t/${fileName}.css`).then(function(data) {
    let str = '/* iOS 4.1- */\n}'
    let arr1 = data.data.split(str)
    let arr2 = data.data.split('-moz-osx-font-smoothing: grayscale;\n}')
    fs.writeFile('src/iconfont.scss', `${arr1[0]}${str}${arr2[1].replace(/:before {/g, '::before {\n')}`)
    cmd.log('============ success ============')
})
