fs = require('fs')

function fileToArray(filename) {
    return fs.readFileSync(filename).toString()
    .split("\n")
}

function printGrid(grid) {
    grid.forEach(row => console.log(row.join("")))
}

module.exports = {
    fileToArray: fileToArray,
    printGrid: printGrid
}