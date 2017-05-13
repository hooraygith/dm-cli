#!/usr/bin/env node
const postcss = require('postcss');
const scss = require('postcss-scss'); // when you use scss syntax
const stylefmt = require('stylefmt');
const stylelint = require('stylelint')

module.exports = function (input) {
  return postcss([stylefmt, stylelint]).process(input, {syntax: scss})
}