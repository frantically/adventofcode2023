const { maxHeaderSize } = require('http')

utils = require('../utils.js')

data = utils.fileToArray("sample.txt")
    .map(line => line.split(""))

console.log(data)

movedARock = true

while(movedARock) {
    movedARock = false
    for(i=0;i<data.length-1;i++) {
        for(j=0;j<data[0].length;j++) {
            if(data[i][j] == "." && data[i+1][j] == "O") {
                data[i][j] = data[i+1][j]
                data[i+1][j] = "."
                movedARock = true
            }
        }
    }
}

data.forEach(row => console.log(row.join("")))

part1 = ""

console.log(`Part 1: ${part1}`)