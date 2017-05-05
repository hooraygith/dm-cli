#!/usr/bin/env node

const shell = require('shelljs');
const config = require('./config/index.js');
const chalk = require('chalk');
const program = require('commander');

program
    .option('-E, --env [env]', '要编译的环境')
    .parse(process.argv);

if (!program.env) {
    console.log(chalk.red('请输入要编译的环境变量 compile --env [环境名]'));
    process.exit(1);
}

if (!shell.test('-f', process.cwd() + "/build/webpack.config." + program.env + ".js")) {
    console.log(chalk.red('找不到文件：' + process.cwd() + "/build/webpack.config." + program.env + ".js"));
    process.exit(1);
}

console.log(chalk.yellow('============compile============'))

//todo compile前置钩子

const webpack = require("webpack");
const webpackConfig = require(process.cwd() + "/build/webpack.config." + program.env + ".js");

// returns a Compiler instance
const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
    console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true
        }))
        // todo compile后置钩子
    console.log(chalk.yellow('============end============'))
});