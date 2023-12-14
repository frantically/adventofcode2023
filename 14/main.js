const { maxHeaderSize } = require('http')

utils = require('../utils.js')

data = utils.fileToArray("sample.txt")
    .map(line => line.split(""))

part1 = ""

console.log(`Part 1: ${part1}`)