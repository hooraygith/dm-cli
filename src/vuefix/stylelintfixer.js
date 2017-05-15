const postcss = require('postcss');
const scss = require('postcss-scss'); // when you use scss syntax
const stylefmt = require('stylefmt');

module.exports = function(input) {
    return postcss([
        stylefmt
    ]).process(input, {
        syntax: scss
    })
}