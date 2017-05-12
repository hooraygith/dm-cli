#!/usr/bin/env node

const stylelint = require('stylelint')

module.exports = function (input) {
  return stylelint.lint({
    code: input,
    formatter: 'string',
    syntax: 'scss'
  })
}
