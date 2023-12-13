const { maxHeaderSize } = require('http')

utils = require('../utils.js')

data = utils.fileToArray("input.txt")
mirrors = [[]]
data.forEach(line => {
    if(line.length == 0) {
        mirrors.push([])
    } else {
        mirrors[mirrors.length - 1].push(line)
    }
})

function evaluateMirrorPoint(data, toCheck) {
    topRow = toCheck-1
    bottomRow = toCheck
    while(topRow >= 0 && bottomRow < data.length) {
        if(data[topRow] != data[bottomRow]) {
            return false
        } else {
        }
        topRow -= 1
        bottomRow += 1
    }
    return true
}

function findMirrorCenter(data) {
    for(i=1;i<data.length;i++) {
        if(evaluateMirrorPoint(data, i)) {
            return i
        }
    }
    return null
}

function transposeArray(array) {
    array = array.map(line => line.split(""))
    return array[0].map((_, colIndex) => array.map(row => row[colIndex])).map(line => line.join(""))
}

horizontalMirrorPoints = mirrors.map(findMirrorCenter).filter(a => a != null).reduce((a, c) => a+c, 0)
verticalMirrorPoints = mirrors.map(transposeArray).map(findMirrorCenter).filter(a => a != null).reduce((a, c) => a+(c), 0)

part1 = verticalMirrorPoints + 100*horizontalMirrorPoints
console.log(`Part 1: ${part1}`)